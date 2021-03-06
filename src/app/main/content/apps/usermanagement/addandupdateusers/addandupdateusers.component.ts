import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import {MatTableDataSource,MatDialog} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from './addandupdate.model';
import { addandupdateService } from './addandupdate.service';
import { Location } from '@angular/common';
import { MapComponent } from '../../usermanagement/map/map.component';
import { mapdetails } from '../../../../../../app/app.constants';

@Component({
  selector: 'app-addandupdateusers',
  templateUrl: './addandupdateusers.component.html',
  styleUrls: ['./addandupdateusers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class AddandupdateusersComponent implements OnInit {
  product = new Product();
  onProductChanged: Subscription;
  pageType: string;
  productForm: FormGroup;
  dialogRef: any;
  mapaddress : string;
  mapvalue :string;
  constructor(
      private productService: addandupdateService,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar,
      private location: Location,public dialog: MatDialog
  )
  {
   
   //this.mapvalue = this.mapdetailsvalue.getData();
  }
  ngOnInit()
  {
    //console.log("get session values");
    //let address = sessionStorage.getItem("mappaddress");
    //console.log(address);
    //this.mapaddress = address;
      // Subscribe to update product on changes
      this.onProductChanged =
          this.productService.onProductChanged
              .subscribe(product => {
                  if ( product )
                  {
                      console.log(product);
                      this.product = new Product(product);
                      this.pageType = 'edit';
                  }
                  else
                  {
                      this.pageType = 'new';
                      this.product = new Product();
                      console.log(this.product);
                  }

                  this.productForm = this.createProductForm();
              });
  }

  ngOnDestroy()
  {
      this.onProductChanged.unsubscribe();
  }

  createProductForm()
  {
      return this.formBuilder.group({
          Accountid             : [222],
          id                    : [this.product.id],
          firstname             : [this.product.firstname],
          emailid               :  [this.product.emailid],       
          rolename              : [ this.product.role],
          lastname              : [ this.product.lastname],
          username              : [ this.product.username],
          password              : [ this.product.password],
          organization          : [ this.product.accountname],
          address               : [ this.product.address ],
          //usertype              : [  this.product.usertype],
          userstatus            : [ this.product.userstatus],
          phone                 : [ this.product.phonenumber]  
        });
  }



  addProduct()
  {
      const data = this.productForm.getRawValue();
      //data.firstname = FuseUtils.handleize(data.firstname);
      //data.emailid = FuseUtils.handleize(data.emailid);     
      this.productService.addProduct(data)
          .then((response) => { 
              let responsedata = JSON.stringify(response);
              let result = JSON.parse(responsedata);
              console.log(result.Message);                   
              //this.productService.onProductChanged.next(data);            
              this.snackBar.open(result.Message, 'OK', {
                  verticalPosition: 'top',
                  duration        : 2000
              });
              this.location.go('apps/usermanagement/users');
          }) 
          .catch(error => {
            console.log(error);                              
            //this.productService.onProductChanged.next(data);            
            this.snackBar.open('User Details are not saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
          }
        );
  }
  openmap()
  {
      this.dialogRef = this.dialog.open(MapComponent, {
          panelClass: 'contact-form-dialog',
          data      : {
              action: 'new'
          }
      });
  
      this.dialogRef.afterClosed()
          .subscribe((response: FormGroup) => {
              if ( !response )
              {
                  return;
              }
              const newEvent = response.getRawValue();
              console.log("map value check");
              console.log(newEvent);
              //this.product.address = newEvent;
     });
  }
  saveProduct()
  {
      const data = this.productForm.getRawValue();
      data.handle = FuseUtils.handleize(data.name);
      this.productService.saveProduct(data)
          .then(result => {
           
              // Trigger the subscription with new data
              //this.productService.onProductChanged.next(data);

              // Show the success message
              this.snackBar.open('User saved', 'OK', {
                  verticalPosition: 'top',
                  duration        : 2000
              });
          })
          .catch(error => console.log(error));
  }
}

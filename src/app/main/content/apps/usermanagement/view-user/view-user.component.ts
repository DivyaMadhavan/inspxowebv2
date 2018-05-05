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

import { Product } from '../addandupdateusers/addandupdate.model';
import { addandupdateService } from '../addandupdateusers/addandupdate.service';
import { Location } from '@angular/common';
import { mapdetails } from '../../../../../../app/app.constants';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ViewUserComponent implements OnInit {
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
}

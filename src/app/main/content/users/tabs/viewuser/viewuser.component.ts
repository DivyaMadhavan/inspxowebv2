import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { Userdetails } from '../../services/manageuser.model';
import { ManageuserService } from '../../services/manageuser.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
 
   // dataSource = new UserDataSource(this.userService);
   displayedColumns = ['firstname','emailid', 'rolename','userstatus','edit'];
   dataSource = new UserDataSource(this.manageuserService);
   //tab: string  = '';
   //selection = new SelectionModel<Userdetails>(true, []);

   constructor(private http: HttpClient,private manageuserService: ManageuserService,private router:Router,private location:Location)
   {
      
   }    
   ngOnInit() {

   }
   userrowedit(value)
   {
    //this.location.go('users');   
    this.router.navigate(['/users']);  
    sessionStorage.setItem("tabvalue","3");
    //console.log(value);
   }
 }
 export class UserDataSource extends DataSource<any> {

   constructor(private manageuserService: ManageuserService) {
     super();
   }
   connect(): Observable<Userdetails[]> {
     console.log(this.manageuserService.getSummaryViewdetails());
     return this.manageuserService.getSummaryViewdetails();
   }
   disconnect() {}
 }



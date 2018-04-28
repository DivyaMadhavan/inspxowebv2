import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
     tab: number;   
      
     constructor(private http: HttpClient)
     {
       
     }    
     ngOnInit() {    
      // let data= this.dataService.serviceData;
      // console.log(data);
      this.tab = 1; 
      let sessionvalue2 = sessionStorage.getItem("tabvalue");
   
      if(sessionvalue2 != null)
      {
        console.log("go to details view :" + sessionvalue2 );
        this.tab = 3;  
      }
     }
  }



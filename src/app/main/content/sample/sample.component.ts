import { Component,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { User } from '../sample/user.model';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { DataSource } from '@angular/cdk/collections';
import { UserService } from '../sample/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
//import { locale as english } from './i18n/en';
//import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent implements OnInit 
{
    // dataSource = new UserDataSource(this.userService);
    displayedColumns = ['select', 'firstname', 'lastname', 'emailid', 'rolename'];
    dataSource = new UserDataSource(this.userService);
   
    selection = new SelectionModel<User>(true, []);

    constructor(private http: HttpClient,private userService: UserService)
    {
       
    }    
    ngOnInit() {

    }
    // isAllSelected() {
    //   const numSelected = this.selection.selected.length;
    //   const numRows = this.dataSource.data.length;
    //   return numSelected === numRows;
    // }
    
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggle() {
    //   this.isAllSelected() ?
    //       this.selection.clear() :
    //       this.dataSource.data.forEach(row => this.selection.select(row));
    // }
  }
  export class UserDataSource extends DataSource<any> {

    constructor(private userService: UserService) {
      super();
    }
    connect(): Observable<User[]> {
      console.log(this.userService.getUserdetails());
      return this.userService.getUserdetails();
    }
    disconnect() {}
  }


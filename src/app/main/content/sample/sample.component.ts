import { Component,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
//import { User } from '../sample/user.model';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { DataSource } from '@angular/cdk/collections';
//import { UserService } from '../sample/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
//import { locale as english } from './i18n/en';
//import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent implements OnInit 
{
    firstName:string;
    employee = { empName: 'Sanket', email: '', phone: '', address:'' };
    constructor(private http: HttpClient,private router:Router)
    {
      
    }    
    ngOnInit() {
        let sessionvalue = sessionStorage.getItem("accountid");
        console.log(sessionvalue);
        if(sessionvalue == null)
        {
            this.router.navigate(['/Login']);  
        }
    }
  }


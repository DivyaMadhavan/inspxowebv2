import { Injectable } from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient }   from '@angular/common/http';
import { Userdetails } from '../services/manageuser.model';


@Injectable()
export class ManageuserService {
  private sumviewurl = 'http://52.176.42.140:8000/user/sumviewuser/';
  
  constructor(private http: HttpClient) { }
  
  getSummaryViewdetails(): Observable<Userdetails[]> {
    return this.http.get<Userdetails[]>(this.sumviewurl);
  }
}
@Injectable()
export class DataService {
  serviceData: string;
}

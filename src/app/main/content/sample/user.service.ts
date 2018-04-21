import { Injectable } from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient }   from '@angular/common/http';
import { User } from '../sample/user.model';
@Injectable()
export class UserService {
  
  private serviceUrl = 'http://52.176.42.140:8000/api/user/';
  
  constructor(private http: HttpClient) { }
  
  getUserdetails(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }
}

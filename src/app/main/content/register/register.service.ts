import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Configuration } from '../../../../app/app.constants';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class RegisterService {

  urlCheckEmail: string = 'http://ptetc.in:8000/checkmail';

  constructor(private http: HttpClient) { }

//   checkEmail1(email:string) {
//     return this.http.post(this.urlCheckEmail, {         
//         params: {
//             "email": email           
//           } 
//        }).subscribe((response: any) => {  
//           return response
//         });
//     }

    checkEmail(email:string) {
        return this.http.post(this.urlCheckEmail,  {         
            params: {
                "email": email           
              } 
           }).map((res: Response) =>{
               return res.json()
            });
      }
}

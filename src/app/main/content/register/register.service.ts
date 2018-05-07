import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Configuration } from '../../../../app/app.constants';

@Injectable()
export class RegisterService {
    constructor(private http: Http) { }
    urlCheckEmail: string;

    isEmailRegisterd(email: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/v1/isEmailRegisterd', JSON.stringify({ email: email }), { headers: headers })
            .map((response: Response) => response.json())            
    }
private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());   
  }
}

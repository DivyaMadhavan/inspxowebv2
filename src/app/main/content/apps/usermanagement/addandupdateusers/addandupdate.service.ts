import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class addandupdateService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                console.log("getting user info");
                console.log(this.routeParams.id);
                this.http.get('http://52.176.42.140:8000/user/detviewuser/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            }
        });
    }

    saveProduct(product)
    {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(product.id);
        const httpOptions = {
          headers: headers,
        };   
        return new Promise((resolve, reject) => {
            this.http.put('http://52.176.42.140:8000/user/updateuser/' + 53,{
            "firstname":"safaf",
            "emailid":"divyamrelsysin",
            "rolename":"fdsf",
            "lastname":"affds",
            "username":"dfsdf",
            "password":"sdfds",
            "organization":"sgdsf",
            "address":"aasdfdfsa","userstatus":"Active","phone":"1234567890"},httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    addProduct(product)
    {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
        const httpOptions = {
          headers: headers,
        };         
        console.log(JSON.stringify(product));
        return new Promise((resolve, reject) => {
            this.http.post('http://52.176.42.140:8000/user/adduser/',JSON.stringify(product),httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}

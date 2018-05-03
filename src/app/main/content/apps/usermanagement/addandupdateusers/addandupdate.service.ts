import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Configuration } from '../../../../../../app/app.constants';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class addandupdateService implements Resolve<any>
{
    private actionUrl: string;
  
    routeParams: any;
    product: any;
    status:any;
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient, private _configuration: Configuration
    )
    {
        this.actionUrl = _configuration.ServerWithApiUrl;
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
            else if ((this.routeParams.firstname !== '') && (this.routeParams.id !=''))
            {
                console.log("getting user info");
                console.log(this.routeParams.id);
                this.http.get( this.actionUrl+'user/detviewuser/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response;
                        //this.product.pagetype = "delete";
                        this.onProductChanged.next(this.product);
                        resolve(response);
               }, reject);
            }
            else
            {
                console.log("getting user info");
                console.log(this.routeParams.id);
                this.http.get( this.actionUrl+'user/detviewuser/' + this.routeParams.id)
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
         return new Promise((resolve, reject) => {
            this.http.put(this.actionUrl+'user/updateuser/' + 53,{
            "firstname":"safaf",
            "emailid":"divyamrelsysin",
            "rolename":"fdsf",
            "lastname":"affds",
            "username":"dfsdf",
            "password":"sdfds",
            "organization":"sgdsf",
            "address":"aasdfdfsa","userstatus":"Active","phone":"1234567890"},httpOptions)
            .subscribe(response => {resolve(response)},
             error => {
             reject(error); 
           })     
        });
    }
    addProduct(product)
    {             
        let bodyString = { 
        "Accountid":1234,
        "firstname":product.firstname, 
        "lastname":product.lastname,  
        "emailid":product.emailid,  
        "phone": product.phone, 
        "address":product.address,
        "password": product.password,  
        "rolename": product.rolename,  
        "organization":product.organization, 
        "username":product.username,
        "userstatus":product.userstatus
        } 
        console.log(JSON.stringify(product));
        return new Promise((resolve, reject) => {
            this.http.post(this.actionUrl+'user/adduser/',bodyString,httpOptions)               
               .subscribe(response => {resolve(response)},
               error => {
                reject(error); 
              })                           
        });
    }
}

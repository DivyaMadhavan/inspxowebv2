import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Configuration } from '../../../../../../app/app.constants';

@Injectable()
export class ManageuserService implements Resolve<any>
{
    private actionUrl: string;
    products: any[];   
    onProductsChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient, private _configuration: Configuration
    )
    {
        this.actionUrl = _configuration.ServerWithdomainAPI;
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
      
        return new Promise((resolve, reject) => {

            Promise.all([               
                this.getProducts()
                                //this.getroles()                        
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProducts(): Promise<any>
    {
      
        let accountid = sessionStorage.getItem("accountid");
        let securitycode =sessionStorage.getItem("securitycode");
        //console.log(accountid);      
        let httpOptions = {
            headers: new HttpHeaders({             
              'securitycode': securitycode     
            })
          };
          console.log('https://'+accountid+this.actionUrl+'user/sumviewuser/');
        return new Promise((resolve, reject) => {
            this.http.get('https://'+accountid+this.actionUrl+'user/sumviewuser/',httpOptions)
                .subscribe((response: any) => {
                    this.products = response;
                    console.log(this.products)
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }
   
}

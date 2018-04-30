import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class usersService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any> = new BehaviorSubject({});

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

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUserSummaryview()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getUserSummaryview(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('http://52.176.42.140:8000/user/sumviewuser/')
                .subscribe((response: any) => {
                    this.products = response;
                    console.log(this.products)
                    //this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }
}

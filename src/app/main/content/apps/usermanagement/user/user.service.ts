import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserDetailService implements Resolve<any>
{
    routeParams: any;
    user: any;
    onUserchanged: BehaviorSubject<any> = new BehaviorSubject({});

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
                this.getUsers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
           
            if ( this.routeParams.id === 'new' )
            {
                console.log(this.routeParams.id);
                this.onUserchanged.next(false);
                resolve(false);
            }
            else
            {
                // this.http.get('api/e-commerce-products/' + this.routeParams.id)
                //     .subscribe((response: any) => {
                //         this.user = response;
                //         this.onUserchanged.next(this.user);
                //         resolve(response);
                //     }, reject);
            }
        });
    }

    saveUserdetails(user)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-products/' + user.id, user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addUsers(user)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/e-commerce-products/', user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}

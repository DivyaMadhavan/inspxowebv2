import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    //public Server1 = 'http://52.176.42.140:8000/';
    public server2 = 'https://ptetc.in:8080/';
    public withaccountid = '.ptetc.in:8080/';
   // public ApiUrl = 'api/';
    public ServerWithApiUrl = this.server2;
    public ServerWithdomainAPI = this.withaccountid;
}

@Injectable()
export class mapdetails {
    //public Server = 'http://52.176.42.140:8000/';
   // public ApiUrl = 'api/';
   public mapdata:string;

   constructor(){
     this.mapdata = "Choose address by clicking the map button";
   }
 
   setData (data) {
     this.mapdata = data;
   }
   getData () {
     return this.mapdata;
   }
}
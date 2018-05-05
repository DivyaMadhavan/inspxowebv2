import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    private accountid:string;
    //public Server1 = 'http://52.176.42.140:8000/';
   
    constructor(){
      //this.accountid = sessionStorage.getItem("acountid");  
      //console.log( this.accountid);    
    }
    //let username =  this.accountid;
    public domainwithhttp = 'https://ptetc.in:8080/';
    public domainurl = '.ptetc.in:8080/';
   // public ApiUrl = 'api/';
    public ServerWithhttpApiUrl = this.domainwithhttp;
    public ServerWithdomainAPI = this.domainurl;
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
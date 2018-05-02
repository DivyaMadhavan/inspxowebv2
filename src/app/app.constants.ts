import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://52.176.42.140:8000/';
   // public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server;
}
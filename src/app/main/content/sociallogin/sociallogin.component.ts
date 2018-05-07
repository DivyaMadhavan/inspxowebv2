import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; 
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { HttpClient} from '@angular/common/http';
import { Configuration } from '../../../app.constants';


@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.scss'],
  animations : fuseAnimations
})

export class SocialLoginComponent implements OnInit {
  private Domainurl: string; 
  private Domainwithhttpurl: string;
  loginForm: FormGroup;
  loginFormErrors: any;
  result:string;
  constructor(    
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder,
      private router :Router,private socialAuthService: AuthService,private http: HttpClient,
      private _configuration: Configuration
  )
{
      this.Domainurl = _configuration.ServerWithdomainAPI;
      this.Domainwithhttpurl = _configuration.ServerWithhttpApiUrl;
      this.fuseConfig.setConfig({
          layout: {
              navigation: 'none',
              toolbar   : 'none',
              footer    : 'none'
          }
      });
      this.loginFormErrors = {
         
        
          accountid:{}
      };
  }
  ngOnInit()
  {
    this.result=null;
    console.log("event listening");
    console.log(this.Domainwithhttpurl);
      this.loginForm = this.formBuilder.group({   
          accountid: ['', Validators.required]       
      }); 

      this.loginForm.valueChanges.subscribe(() => {
          this.onLoginFormValuesChanged();
      });
  }
  onLoginFormValuesChanged()
  {
      for ( const field in this.loginFormErrors )
      {
          if ( !this.loginFormErrors.hasOwnProperty(field) )
          {
              continue;
          }
          // Clear previous errors
          this.loginFormErrors[field] = {};
          // Get the control
          const control = this.loginForm.get(field);

          if ( control && !control.valid )
          {
              this.loginFormErrors[field] = control.errors;
          }
      }
  }
  
  loginclick() {
    this.result='';
    //this.errormessage='';
     // console.log(this.Domainurl);   
      let accountid = this.loginForm.value.accountid; 
      let socialtype = sessionStorage.getItem("Socialtype");
      let socialtypetoken = sessionStorage.getItem("socialtypetoken");      
      let url="https://"+accountid+'.'+"ptetc.in:8080/user/sociallogin/";
      this.http.get(url, {         
                params: {
                    socialtype: socialtype,
                    socialtypetoken:socialtypetoken
                  } 
             }).subscribe(data => {                  
                 let logindetails = JSON.stringify(data);
                 let userdetails =JSON.parse(logindetails);
                 if(userdetails.length != 0)
                 {
                    //console.log("value occured");
                    let userdet =JSON.stringify(userdetails[0]);
                    let dataval =JSON.parse(userdet);
                    //console.log(dataval.firstname); 
                    sessionStorage.setItem("accountid",dataval.accountid);
                    sessionStorage.setItem("id",dataval.id);
                    sessionStorage.setItem("firstname",dataval.firstname);
                    sessionStorage.setItem("lastname",dataval.lastname);
                    sessionStorage.setItem("role",dataval.role);
                    //sessionStorage.setItem("permission",dataval.permission);
                    sessionStorage.setItem("securitycode",dataval.securitycode);
                   // console.log(dataval.accountid); 
                    this.router.navigate(['/Dashboard']);  
                 }  
                 else
                 {
                     // console.log("nul value");
                     this.result = "Account was not Activated";
                 } 
          },
          err => {
            let logindetails = JSON.stringify(err);
            let errormessage = JSON.parse(logindetails);
            this.result = errormessage.error.detail;           
            console.log(errormessage);
          })
        }
}
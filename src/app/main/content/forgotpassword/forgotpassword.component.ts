import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations'
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Configuration } from '../../../app.constants';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  animations : fuseAnimations
})
export class ForgotpasswordComponent implements OnInit {
    private actionUrl: string;
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;
    result:string;
    errormessage:string;
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private http:HttpClient,
        private router :Router, private _configuration: Configuration
    )
    {
        this.actionUrl = _configuration.ServerWithApiUrl;
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
        this.forgotPasswordFormErrors = {
            email: {},
            accountid:{},
            username:{}
        };
    }

    ngOnInit()
    {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username:['', Validators.required],
            accountid:['', Validators.required]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }

    forgotpassword()
    {
        this.result='';
        this.errormessage='';
        console.log( this.forgotPasswordForm);
        let username = this.forgotPasswordForm.value.username;
        let emailid = this.forgotPasswordForm.value.email;
        let accountid = this.forgotPasswordForm.value.accountid;
        this.http.get(this.actionUrl+'login/forgotpass/', {         
                  params: {
                      username: username,
                      emailid: emailid,
                      accountid: accountid,
                    } 
               }).subscribe(data => { 
                   console.log(data);
                   let forgotpassword = JSON.stringify(data);
                   let returnresponse =JSON.parse(forgotpassword);
                   this.result = returnresponse.Message;          
                  
            },
            err => {
              console.log(err);
              let forgotpassword1 = JSON.stringify(err);
              let returnresponse1 =JSON.parse(forgotpassword1);             
              this.errormessage =returnresponse1.error.detail;
            })
    }
}
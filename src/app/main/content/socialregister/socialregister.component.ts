import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource,MatDialog} from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { TermsandconditionComponent } from '../register/termsandcondition/termsandcondition.component';
import { Configuration } from '../../../app.constants';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
//import { DatePipe } from '@angular/common';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };

@Component({
  selector: 'app-socialregister',
  templateUrl: './socialregister.component.html',
  styleUrls: ['./socialregister.component.scss'],
  animations : fuseAnimations
})
export class SocialregisterComponent implements OnInit {
    private actionUrl: string;
     registerForm: FormGroup;
     registerFormErrors: any;
     result :string='';
     errormessage:string='';
     date:any;
     dialogRef: any;
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,private _configuration: Configuration,
        private socialAuthService: AuthService,private http: HttpClient, public dialog: MatDialog
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

        this.registerFormErrors = {
            firstname  : {},
            lastname   : {},
            email      : {},
            phonenumber :{},
            industrylistdet :{},
            companyname :{},
            countryname :{}           
          };
    }
    ngOnInit()
    {
       // this.date = new Date();
        //let dateval= this.datePipe.transform(this.date, 'dd/MM/yyyy');
        //console.log(dateval);
        this.registerForm = this.formBuilder.group({
            firstname    : [ { value   : "facebookname", disabled: true }, Validators.required],
            lastname     : [ { value   : "facebookname", disabled: true }, Validators.required],
            email        : [ { value   : "keerthanamehendran@gmail.com", disabled: true }, [Validators.required, Validators.email]],
            phonenumber  : [ { value   : "9568741230", disabled: true}, Validators.required],
            industrylistdet :     ['', Validators.required],                   
            companyname       : ['', Validators.required],          
            countryname : ['', Validators.required], 
            confirmCheckbox:['',Validators.required]           
        },{validator: checkCheckbox});

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }
    termsandconditions()
    {
        this.dialogRef = this.dialog.open(TermsandconditionComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });
    
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
    
                //this.contactsService.updateContact(response.getRawValue());
    
            });
    }
    
    Registerclick()
    {
    
        //console.log(this.registerForm);
        let Accountid= 123456;  
        let firstname = this.registerForm.value.firstname;
        let lastname = this.registerForm.value.lastname;
        let emailid = this.registerForm.value.email;
        let phone = this.registerForm.value.phonenumber;
        let companyname = this.registerForm.value.companyname;      
        let industryname = this.registerForm.value.industrylistdet;
        let country = this.registerForm.value.countryname;
        let username = "None";
        let password = "None";
        // let dojoin = "04-08-2017";
        // let accounttype = "Free Tire";
        // let accountstatus = "True";
        // let dosubcription = "04-08-2017";
        // let expirydate = "04-08-2017";
        // let rolename = "Owner";
        // let address = "Current Address";
        console.log(JSON.stringify({
            "Accountid":123456,            
            "firstname": firstname,   
            "lastname":lastname,  
            "emailid":emailid,   
            "phone": phone,     
            "companyname": companyname, 
            "industryname": industryname,  
            "country":country,
            "username":username,    
            "password": password,  
            "dojoin":"04-08-2017",
            "accounttype":"Free Tire",
            "accountstatus": "True",
            "dosubcription":"04-08-2017",
            "expiredate":"04-08-2017",
            "rolename":"Owner",
            "address":"Current Address",
            "socialtype" : "facebook",
            "socialtypeToken":"abcdfhjksdfjsdbfdjshfi"
       }));
       this.http.post(this.actionUrl+"login/socialregister/",JSON.stringify({
             "Accountid":123456,            
             "firstname": firstname,   
             "lastname":lastname,  
             "emailid":emailid,   
             "phone": phone,     
             "companyname": companyname, 
             "industryname": industryname,  
             "country":country,
             "username":username,    
             "password": password,  
             "dojoin":"04-08-2017",
             "accounttype":"Free Tire",
             "accountstatus": "True",
             "dosubcription":"04-08-2017",
             "expiredate":"04-08-2017",
             "rolename":"Owner",
             "address":"Current Address",
             "socialtype" : "facebook",
             "socialtypeToken":"abcdfhjksdfjsdbfdjshfi"
        }),httpOptions).subscribe(data => {  
            let registerresponse = JSON.stringify(data);
            let registereddet =JSON.parse(registerresponse);
            console.error(registereddet);  
            //this.errormessage="";   
            this.result = registereddet.Message;
           
         },
          err => {
            console.error(err);         
            this.errormessage = "Registration Failed";
        })
    }
    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
}
function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
function checkCheckbox(c: AbstractControl){
    if(c.get('confirmCheckbox').value == false){
        return false;
    }else return true;
} 




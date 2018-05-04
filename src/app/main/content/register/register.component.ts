import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource,MatDialog} from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { Configuration } from '../../../app.constants';
import {RegisterService} from './register.service';
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
  let industryarray= [];
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations : fuseAnimations
})
export class RegisterComponent implements OnInit {
    private actionUrl: string;
     registerForm: FormGroup;
     registerFormErrors: any;
     result :string;
     errormessage:string;
     date:any;
     dialogRef: any;
     industry = [];
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder, private _configuration: Configuration, private registerservice:RegisterService,
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
            accountid : {},
            firstname  : {},
            lastname   : {},
            email      : {},
            phonenumber :{},
            industrylistdet :{},
            password     : {},
            passwordConfirm: {},
            companyname :{},
            countryname :{},
            username :{},
            confirmCheckbox:{}
        };
    }
 
    ngOnInit()
    {
       // this.date = new Date();
        //let dateval= this.datePipe.transform(this.date, 'dd/MM/yyyy');
        //console.log(dateval);
        this.registerForm = this.formBuilder.group({
            accountid :  ['', Validators.required],
            firstname    : ['', Validators.required],
            lastname     : ['', Validators.required],
            email         : ['', [Validators.required, Validators.email]],
            phonenumber   : ['', Validators.required],
            industrylistdet  :     ['', Validators.required],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]],           
            companyname       : ['', Validators.required],          
            countryname : ['', Validators.required],
            username : ['', Validators.required],
            confirmCheckbox:['',Validators.required]          
        },{validator: checkCheckbox});

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
        this.getindustrydetails();
    }
    // emailExisteValidation() {
    //     //this.registerservice.checkEmail(this.registerForm.controls['email'].value).subscribe(data => {
    //         let control = this.registerForm.get('email');
    //         console.log("email validation check");
    //         if (control.valid && control.dirty) {
    //             console.log("email loop entry check validation check");
    //             this.registerservice.checkEmail(this.registerForm.value.email).subscribe(data => {
    //                 let registerresponse = JSON.stringify(data);
    //                 console.log("email response");
    //                 if(registerresponse != '')
    //                   console.log("have some error");                       
    //                   return { "emailExistant": true };
    //                 })
    //             }
    //         return null;
    //     }
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
        this.result='';
        this.errormessage='';
        //console.log(this.registerForm);
        let Accountid= this.registerForm.value.accountid;  
        let firstname = this.registerForm.value.firstname;
        let lastname = this.registerForm.value.lastname;
        let emailid = this.registerForm.value.email;
        let phone = this.registerForm.value.phonenumber;
        let companyname = this.registerForm.value.companyname;      
        let industryname = this.registerForm.value.industrylistdet;
        let country = this.registerForm.value.countryname;
        let username = this.registerForm.value.username;
        let password = this.registerForm.value.password;
        // let dojoin = "04-08-2017";
        // let accounttype = "Free Tire";
        // let accountstatus = "True";
        // let dosubcription = "04-08-2017";
        // let expirydate = "04-08-2017";
        // let rolename = "Owner";
        // let address = "Current Address";
        console.log(JSON.stringify({
            "domain_url": Accountid +'ptetc.in',
             "schema_name": Accountid,                  
             "firstname": firstname,   
             "lastname":lastname,  
             "emailid":emailid,  
             "phone": phone,     
             "companyname": companyname, 
             "industryname": industryname,  
             "country":country,
             "username":username,    
             "password": password,  
             "dojoin": "30-04-2018",
            "subscriptiontype": "Free tier",
            "accountstatus": "In-Active",
            "dosubscription": "30-04-2018",
            "expirydate": "30-05-2018",
            "role": "Owner",
            "socialtype": "None",
            "socialtypetoken": "None"
       }));
       this.http.post(this.actionUrl+'register/',JSON.stringify({
             "domain_url": Accountid +'.ptetc.in',
             "schema_name": Accountid,                  
             "firstname": firstname,   
             "lastname":lastname,  
             "emailid":emailid,  
             "phonenumber": phone,     
             "companyname": companyname, 
             "industryname": industryname,  
             "country":country,
             "username":username,    
             "password": password,  
             "dojoin": "30-04-2018",
            "subscriptiontype": "Free tier",
            "accountstatus": "In-Active",
            "dosubscription": "30-04-2018",
            "expirydate": "30-05-2018",
            "role": "Owner",
            "socialtype": "None",
            "socialtypetoken": "None"

        }),httpOptions).subscribe(data => {  
            let registerresponse = JSON.stringify(data);
            let registereddet =JSON.parse(registerresponse);
            console.error(registereddet);     
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
    getindustrydetails()
    {
      this.http.get(this.actionUrl +'getindustry/', {         
           
    }).subscribe(orgdata => {  
        let organisationdetails = JSON.stringify(orgdata);
        let industrylistdet =JSON.parse(organisationdetails);
        if(industrylistdet.length != 0)
        {
           for(var org=0;org < industrylistdet.length;org++)
           {
            industryarray.push({"id":industrylistdet[org].id,"industryname":industrylistdet[org].industryname});        
           }  
           let organisationdetails1 = JSON.stringify(industryarray);
           //console.log("organisationdetails1");
           console.log(organisationdetails1);
           this.industry =JSON.parse(organisationdetails1);  
           console.log(this.industry); 
        }  
        else
        {
           // this.industry.push({"industryname":"No Industry Found"});
            //this.result = "Account was not Activated";
        } 
    },
    err => {
         console.error(err);
       //this.errormessage = "Registration Failed";
     })
    }
public socialSignIn(socialPlatform : string) {
    //console.log("ClickEvent socialmedia");
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
        //console.log("facebook socialmedia");
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
        //console.log("google socialmedia");
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
       console.log(socialPlatform+" sign in data : " , userData);
        //Now sign-in with userData
        this.http.get(this.actionUrl+'login/socialregister/', {         
            params: {
                socialtype: "facebook",
                socialtypetoken: "XXXxx"              
              } 
         }).subscribe(data => { 
             let logindetails1 = JSON.stringify(data);
             let userdetails1 =JSON.parse(logindetails1); 
             console.log(userdetails1);
             //this.router.navigate(['/Dashboard']); 
      },
      err => {
        console.log("Error occured");
      })
        //this.router.navigate(['/Dashboard']);
      }
    );
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

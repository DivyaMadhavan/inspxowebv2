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
  let industryarray= [];
@Component({
  selector: 'app-socialregister',
  templateUrl: './socialregister.component.html',
  styleUrls: ['./socialregister.component.scss'],
  animations : fuseAnimations
})
export class SocialregisterComponent implements OnInit {
    private actionUrl: string;
    private industryactionUrl:string;
     registerForm: FormGroup;
     registerFormErrors: any;
     result :string='';
     errormessage:string='';
     date:any;
     dialogRef: any;
     industry = [];
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,private _configuration: Configuration,
        private socialAuthService: AuthService,private http: HttpClient, public dialog: MatDialog
    )
    {
        this.industryactionUrl = _configuration.ServerWithhttpApiUrl;
        this.actionUrl = _configuration.ServerWithdomainAPI;
       
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
        this.registerFormErrors = {  
            accountid :{},
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
          
            let Regname = sessionStorage.getItem("Regname");            
            let socialemail = sessionStorage.getItem("RegSocialemail");  
            //let Regname  = "dsf";
            //let socialemail = "sfdsf@gmail.com";
           this.registerForm = this.formBuilder.group({
            firstname    : [ Regname, Validators.required],
            lastname     : [ Regname, Validators.required],
            email        : [ socialemail , [Validators.required, Validators.email]],
            phonenumber  : [ '', Validators.required],
            accountid     :['', Validators.required],
            industrylistdet : ['', Validators.required],                   
            companyname : ['', Validators.required],          
            countryname : ['', Validators.required], 
            confirmCheckbox:['',Validators.required]           
        },{validator: checkCheckbox});
        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
        this.getindustrydetails();
    }
    getindustrydetails()
    {
      this.http.get(this.industryactionUrl +'getindustry/', {         
           
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
        let socialtype = sessionStorage.getItem("RegSocialtype");          
        let socialtypetokenvalue = sessionStorage.getItem("RegSocialtoken");   
        let Accountid= this.registerForm.value.accountid;
        let firstname = this.registerForm.value.firstname;
        let lastname = this.registerForm.value.lastname;
        let emailid = this.registerForm.value.email;
        let phone = this.registerForm.value.phonenumber;
        let companyname = this.registerForm.value.companyname;      
        let industryname = this.registerForm.value.industrylistdet;
        let country = this.registerForm.value.countryname;
       let allparams = {
            "domain_url": Accountid+".ptetc.in",
            "schema_name": Accountid,
            "firstname": firstname,
            "lastname": lastname,
            "emailid": emailid,
            "phonenumber": phone,
            "companyname": companyname,
            "industryname": industryname,
            "country": country,
            "username": "None",
            "password": "None",
            "dojoin": "30-04-2018",
            "subscriptiontype": "Free tier",
            "accountstatus": "In-Active",
            "dosubscription": "30-04-2018",
            "expirydate": "30-05-2018",
            "role": "Owner",
            "socialtype": socialtype,
            "socialtypetoken": socialtypetokenvalue  
           };
           console.log(allparams);
           console.log(JSON.stringify(allparams));
       this.http.post(this.industryactionUrl+"socialregister/",allparams,httpOptions).subscribe(data => {  
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




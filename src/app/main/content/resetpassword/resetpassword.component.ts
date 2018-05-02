import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Configuration } from '../../../app.constants';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'      
  })
};
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  animations : fuseAnimations
})
export class ResetpasswordComponent implements OnInit {
    private actionUrl: string;
  resetForm: FormGroup;
  resetFormErrors: any;
  result:string;
  errormessage:string;
  constructor(
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder,
      private http: HttpClient, private _configuration: Configuration
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
    this.resetFormErrors = {       
        password: {},
        passwordConfirm :{}
        
    };
}
  ngOnInit() {
      //get userid from the link and get the account id from the api then pass that account id when reset password
    this.result=null;
    console.log("event listening");
      this.resetForm = this.formBuilder.group({
        passwordConfirm: ['', [Validators.required, confirmPassword]],   
        password: ['', Validators.required]
      });

      this.resetForm.valueChanges.subscribe(() => {
          this.onresetFormValuesChanged();
      });
  }
  onresetFormValuesChanged()
  {
      for ( const field in this.resetFormErrors )
      {
          if ( !this.resetFormErrors.hasOwnProperty(field) )
          {
              continue;
          }
          // Clear previous errors
          this.resetFormErrors[field] = {};
          // Get the control
          const control = this.resetForm.get(field);

          if ( control && !control.valid )
          {
              this.resetFormErrors[field] = control.errors;
          }
      }
  }

  resetclick() {  
    this.result='';
    this.errormessage='';
    let password = this.resetForm.value.password;
    let accountid = this.resetForm.value.accountid;
    this.http.put(this.actionUrl+'login/passreset/1',JSON.stringify({         
         "password":password  
         }),httpOptions).subscribe(data => {                
               let logindetails = JSON.stringify(data);
               let userdetails =JSON.parse(logindetails);              
               console.log(userdetails.Message); 
               this.result = userdetails.Message; 
        },
        err => {
          console.log(err);
          this.errormessage = err;
        })
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



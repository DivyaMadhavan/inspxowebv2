import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };
let userdetails=[];
let details;


@Component({
  selector: 'app-userdetailview',
  templateUrl: './userdetailview.component.html',
  styleUrls: ['./userdetailview.component.scss']
})
export class UserdetailviewComponent implements OnInit {
    //username: string;
  form: FormGroup;
  formErrors: any;
  result :string;
  errormessage:string;
  //userdetails:any;
  
 // mydata :string;
  constructor(private formBuilder: FormBuilder,private http: HttpClient) { 
   this.formErrors = {    
    firstName : {},
    lastName  : {},
    emailid   : {},
    username  : {},   
    address   : {}, 
    Status    : {},   
    phonenumber:{},
    organization:{},
    rolename:{}
};
}
  ngOnInit() {     
        //   this.http.get('http://52.176.42.140:8000/user/detviewuser/1',      
                
        //     ).subscribe(data => {                  
        //          let detviewdetails = JSON.stringify(data);
        //          let userdetails1 =JSON.parse(detviewdetails);
        //          let udetails = JSON.stringify(userdetails1);
        //          let usdetails = JSON.parse(udetails);                    
        //          userdetails.push({"username":usdetails.username});                
        //         // details= userdetails1.username;
        //          console.log(userdetails);
        //   },
        //   err => {
        //     console.error(err);
          
        // })      
       // console.log(userdetails[0].username);
            this.formErrors.firstName="test";
            this.formErrors.lastName="test";
            this.formErrors.emailid="Keerthanamahendran@gmail.com";
            this.formErrors.phonenumber="1234567890";                 
            this.formErrors.username="Test"; 
            this.formErrors.Status="Active"; 
            this.formErrors.address="24,address details";       
            this.formErrors.organization = "Company123";
            this.formErrors.rolename="Buyer";
            this.form = this.formBuilder.group({   
            firstName :  [ { value   : this.formErrors.firstName, disabled: false }, Validators.required],
            lastName  :  [ { value   :  this.formErrors.lastName, disabled: false }, Validators.required],
            emailid   :  [ { value   :  this.formErrors.emailid, disabled: false }, Validators.required],
            username  :  [ { value   : this.formErrors.username, disabled: false }, Validators.required],     
            address   :  [ { value   :   this.formErrors.address, disabled: false }, Validators.required],    
            Status    :  [ { value   :  this.formErrors.Status, disabled: false }, Validators.required],    
            phonenumber : [ { value   :   this.formErrors.phonenumber, disabled: false }, Validators.required],
            organization : [ { value   :   this.formErrors.organization, disabled: false }, Validators.required],
            rolename : [ { value   :   this.formErrors.rolename, disabled: false }, Validators.required]
        });
    
  this.form.valueChanges.subscribe(() => {
    this.onFormValuesChanged();
});
  }  
 
  onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }
            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }
    updateUserDetails()
    {
      console.log("updating user DEtails");
      console.log(this.formErrors);      
      let firstname1 = "test";
      let lastname1 ="divya";
      let email1 = "divyam@relsys.in";
      let phonenumber1 = "1234567890";       
      let address1 = "24,address details"; 
      let password1 = "test123"
      let role1 ="Buyer";
      let organization1 ="Company123";
      let username1 = "Owner";
      let status1 = "Active";  
      
      //let options=new httpOptions({headers:myHeaders});
     this.http.put("http://52.176.42.140:8000/user/edituser/51",JSON.stringify({ 
         "firstname":firstname1, 
         "lastname":lastname1,  
         "emailid":email1,  
         "phone": phonenumber1, 
         "address":address1,
         "password": password1,  
         "rolename": role1,  
         "organization":organization1, 
         "username":username1,
         "userstatus":status1           
      }),httpOptions)   
      .subscribe(data => {  
          console.log(data);
          let adduserres = JSON.stringify(data);
          let adduserdet =JSON.parse(adduserres);
          console.error(adduserdet);     
          this.result = adduserdet.Message;
       },
        err => {
          console.error(err);
          this.errormessage = "Updation Failed";
      })
    
    }
}
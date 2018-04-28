import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { RequestOptions,Headers } from '@angular/http';
//import { Options } from 'selenium-webdriver/edge';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
    })
  };
  let rolesaarray= [];
let organisationaarray= [];
@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss']
})
export class AddusersComponent implements OnInit {
  adduserdetailform: FormGroup;
  formErrors: any;
  result :string;
  errormessage:string;
  displayroles= [];
  displayorganisation= [];
  constructor(private formBuilder: FormBuilder,private http:HttpClient) { 
      this.formErrors = {      
        firstName : {},
        lastName  : {},
        emailid   : {},       
        password  : {},
        address   : {},
        Status    : {},
        listdet   : {}, //organization dropdwon name 
        country   : {}, //role dropdwon name 
        phonenumber :{},
        username : {}
    };
    }
    ngOnInit() {
      // Reactive Form
      this.getusers();
      this.getorgdet();
      this.adduserdetailform = this.formBuilder.group({
      //   company   : [
      //       {
      //           value   : 'Google',
      //           disabled: true
      //       }, Validators.required
      //   ],
        firstName : ['', Validators.required],
        lastName  : ['', Validators.required],
        emailid   : ['', Validators.required],      
        password  : ['', Validators.required],
        address   : ['', Validators.required],   
        listdet  : ['', Validators.required],
        country   : ['', Validators.required], 
        Status    : [{value:'Active',disabled:true}, Validators.required],
        phonenumber :  ['', Validators.required],
        username :  ['', Validators.required]
    });
    this.adduserdetailform.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
  });
  
    }
    addusers()
    {
        //console.log(this.adduserdetailform);      
        let firstname1 = this.adduserdetailform.value.firstName;
        let lastname1 = this.adduserdetailform.value.lastName;
        let email1 = this.adduserdetailform.value.emailid;
        let phonenumber1 = this.adduserdetailform.value.phonenumber;       
        let address1 = this.adduserdetailform.value.address;
        let password1 = this.adduserdetailform.value.password;
        let role1 = this.adduserdetailform.value.country;
        let organization1 = this.adduserdetailform.value.listdet;
        let username1 = "Owner";
        let status1 = "Active";
        this.http.post("http://52.176.42.140:8000/user/adduser/",JSON.stringify({           
           "Accountid":1234,
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
            this.errormessage = "Registration Failed";            
        })
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
              const control = this.adduserdetailform.get(field);
  
              if ( control && control.dirty && !control.valid )
              {
                  this.formErrors[field] = control.errors;
              }
          }
      }    
    
      getusers()
      {
       this.http.get('http://52.176.42.140:8000/user/getrole/', {         
       
     }).subscribe(data => {  
        //console.log("value occured");
         let roledetails = JSON.stringify(data);
         let roles =JSON.parse(roledetails);
         //console.log(roles);
         if(roles.length != 0)
         {
            for(var role=0;role < roles.length;role++)
            {
               rolesaarray.push({"id":roles[role].id,"rolename":roles[role].rolename});        
            }  
            let roledetails1 = JSON.stringify(rolesaarray);
            this.displayroles =JSON.parse(roledetails1);
            console.log(this.displayroles); 
            //this.router.navigate(['/Dashboard']);  
         }  
         else
         {
              console.log("null value");
             //this.result = "Account was not Activated";
         } 
  },
  err => {
    console.error(err);
    //this.errormessage = "Registration Failed";
})
  }
  getorgdet()
{
  this.http.get('http://52.176.42.140:8000/user/getorganization/', {         
       
}).subscribe(orgdata => {  
    let organisationdetails = JSON.stringify(orgdata);
    let organisation =JSON.parse(organisationdetails);
    if(organisation.length != 0)
    {
       
       for(var org=0;org < organisation.length;org++)
       {
        organisationaarray.push({"id":organisation[org].id,"organisationname":organisation[org].organizationname});        
       }  
       let organisationdetails1 = JSON.stringify(organisationaarray);
       console.log("organisationdetails1");
       console.log(organisationdetails1);
       this.displayorganisation =JSON.parse(organisationdetails1);  
       console.log(this.displayorganisation); 
       
    }  
    else
    {
         console.log("null value");
        //this.result = "Account was not Activated";
    } 
},
err => {
  console.error(err);
  //this.errormessage = "Registration Failed";
})
}

    //   roledp = [
    //     {value: 'steak-0'},
    //     {value: 'pizza-1'},
    //     {value: 'tacos-2'}
    //   ];
  }
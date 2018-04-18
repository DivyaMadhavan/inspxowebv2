import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  form: FormGroup;
  formErrors: any;

  
  constructor(private formBuilder: FormBuilder) { 
   this.formErrors = {
    company   : {},
    firstName : {},
    lastName  : {},
    emailid   : {},
    userid    : {},
    password  : {},
    address   : {},
    address2  : {},
    city      : {},
    Status     : {},
    listdet: {},
    country   : {},
    phonenumber:{}
};


}
  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
    //   company   : [
    //       {
    //           value   : 'Google',
    //           disabled: true
    //       }, Validators.required
    //   ],
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required],
      emailid   : ['', Validators.required],
      userid    : ['', Validators.required],
      password  : ['', Validators.required],
      address   : ['', Validators.required],
      address2  : ['', Validators.required],
      city      : ['', Validators.required],
      Status     : ['', Validators.required],
      listdet:    ['', Validators.required],
      country   : ['', Validators.required],
      phonenumber :  ['', Validators.required]
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

}

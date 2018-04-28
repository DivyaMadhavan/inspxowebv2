import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-termsandcondition-contact-form-dialog',
  templateUrl: './termsandcondition.component.html',
  styleUrls: ['./termsandcondition.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class TermsandconditionComponent {

  event: CalendarEvent;
  dialogTitle: string;
  contactForm: FormGroup;
  action: string;

  constructor(
      public dialogRef: MatDialogRef<TermsandconditionComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private formBuilder: FormBuilder
  )
  {
      this.action = data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Edit Contact';
          //this.contact = data.contact;
      }
      else
      {
          this.dialogTitle = 'New Contact';
          //this.contact = new Contact({});
      }

      this.contactForm = this.createContactForm();
  }

  createContactForm()
  {
      return this.formBuilder.group({
         
      });
  }

}

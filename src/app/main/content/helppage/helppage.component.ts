import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations'
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-helppage',
  templateUrl: './helppage.component.html',
  styleUrls: ['./helppage.component.scss'],
  animations : fuseAnimations
})
export class HelppageComponent implements OnInit {

  private Domainurl: string; 
  private Domainwithhttpurl: string;
  loginForm: FormGroup; 
  result:string;
  constructor(    
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder,
      private router :Router,private http: HttpClient     
  )
{
    
      this.fuseConfig.setConfig({
          layout: {
              navigation: 'none',
              toolbar   : 'none',
              footer    : 'none'
          }
      });
    
  }
  ngOnInit()
  {
    this.result=null;
    console.log("event listening");
    console.log(this.Domainwithhttpurl);
      this.loginForm = this.formBuilder.group({        
             
      }); 
  }
}

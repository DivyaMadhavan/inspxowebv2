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

  constructor() { }

  ngOnInit() {
  }

}

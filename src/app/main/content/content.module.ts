import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';

//import { SocialregisterComponent } from './socialregister/socialregister.component';
//import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
    declarations: [
        FuseContentComponent
              
    ],
    imports     : [
        RouterModule,
        FuseSharedModule        
    ],
    exports: [
        FuseContentComponent
    ]
})
export class FuseContentModule
{
}

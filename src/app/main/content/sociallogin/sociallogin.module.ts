import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SocialLoginComponent } from './sociallogin.component';

const routes = [
    {
        path     : 'SocialLogin',
        component: SocialLoginComponent
    }
];

@NgModule({
    declarations: [
        SocialLoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ],
    exports     : [
        SocialLoginComponent
    ]
})

export class FuseSocialLoginModule
{

}
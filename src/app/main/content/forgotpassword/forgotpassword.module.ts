import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ForgotpasswordComponent } from './forgotpassword.component';

const routes = [
    {
        path     : 'ForgotPassword',
        component: ForgotpasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotpasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
    ],
    exports     : [
        ForgotpasswordComponent
    ]
})
export class Forgotpasswordmodule
{
}

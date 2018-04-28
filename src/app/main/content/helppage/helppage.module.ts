import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HelppageComponent } from './helppage.component';

const routes = [
    {
        path     : 'HelpPage',
        component: HelppageComponent
    }
];

@NgModule({
    declarations: [
        HelppageComponent
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
        HelppageComponent
    ]
})

export class HelpPageModule
{

}
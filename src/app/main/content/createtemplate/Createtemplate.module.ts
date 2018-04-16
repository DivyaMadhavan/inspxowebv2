import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CreatetemplateComponent } from './createtemplate.component';
const routes = [
    {
        path     : 'createtemplate',
        component: CreatetemplateComponent
    }
];
@NgModule({
    declarations: [
        CreatetemplateComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
    ],
    exports     : [
        CreatetemplateComponent
    ]
})
export class CreatetemplateModule
{

}

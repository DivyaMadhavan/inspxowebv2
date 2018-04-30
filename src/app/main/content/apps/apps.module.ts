import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { FuseAngularMaterialModule } from './components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [ 
        {
            path        : 'users',
            loadChildren: './usermanagement/usermanagement.module#usermanagementModule'
        }
];

@NgModule({
    imports     : [
        FuseSharedModule,
        RouterModule.forChild(routes)        
    ]
})
export class inspexoAppsModule
{

}
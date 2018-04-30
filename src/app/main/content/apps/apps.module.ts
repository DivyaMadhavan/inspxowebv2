import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { FuseAngularMaterialModule } from './components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [ 
        {
            path        : 'usermanagement',
            loadChildren: './usermanagement/usermanagement.module#UsermangementModule'
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
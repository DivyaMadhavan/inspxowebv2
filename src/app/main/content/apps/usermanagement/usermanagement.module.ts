import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
//import { FuseAngularMaterialModule } from './components/angular-material/angular-material.module';

import { UsersComponent } from './users/users.component';
import { ManageuserService } from './users/users.service';
import { AddandupdateusersComponent } from './addandupdateusers/addandupdateusers.component';
//import { UserComponent } from './user/user.component';
import { addandupdateService } from './addandupdateusers/addandupdate.service';

const routes: Routes = [
        {
        path     : 'users',
        component: UsersComponent,
        resolve  : {
           data: ManageuserService
        }
    },
    {
        path     : 'users/:id',
        component: AddandupdateusersComponent,
        resolve  : {
            data: addandupdateService
        }
    },
    {
        path     : 'users/:id/:handle',
        component: AddandupdateusersComponent,
        resolve  : {
            data: addandupdateService
        }
    }
];
@NgModule({
    declarations: [
        UsersComponent,
        AddandupdateusersComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        CdkTableModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers   : [
        ManageuserService,addandupdateService        
    ]
})
export class usermanagementModule
{
}

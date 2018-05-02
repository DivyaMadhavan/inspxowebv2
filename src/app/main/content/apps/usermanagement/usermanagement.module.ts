import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { 
     MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule 
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule,MapsAPILoader } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
//import { FuseAngularMaterialModule } from './components/angular-material/angular-material.module';

import { UsersComponent } from './users/users.component';
import { ManageuserService } from './users/users.service';
import { AddandupdateusersComponent } from './addandupdateusers/addandupdateusers.component';
//import { UserComponent } from './user/user.component';
import { addandupdateService } from './addandupdateusers/addandupdate.service';
import { MapComponent } from './map/map.component';

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
        AddandupdateusersComponent,
        MapComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),       
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatStepperModule,
        NgxChartsModule,       
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDl7mxzn73b215LyNPY7nlV9IC4arkxjLA",
            libraries: ["places"]
          }),
        FuseSharedModule,
        FuseWidgetModule,
    ],
    exports     : [        
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
    ],
    providers   : [
        ManageuserService,addandupdateService        
    ],
    entryComponents: [MapComponent]
})
export class usermanagementModule
{
}

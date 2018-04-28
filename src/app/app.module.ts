import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider } from "angular5-social-login";
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AgmCoreModule } from '@agm/core';
//import { DatePipe } from '@angular/common';
//import { FORM_DIRECTIVES } from '@angular/common';
import { } from 'googlemaps';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { FuseLoginModule } from './main/content/login/login.module';
import { AuditRegistorModule } from './main/content/register/register.module';
import { HelpPageModule } from './main/content//helppage/helppage.module';
import { Forgotpasswordmodule } from './main/content/forgotpassword/forgotpassword.module';
import { CreatetemplateModule } from './main/content/createtemplate/createtemplate.module';
import { resetpasswordModule } from './main/content/resetpassword/resetpassword.module';
import { socialregisterModule } from './main/content/socialregister/socialregister.module';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"; // <----- Here
import { testModule } from './main/content//test/test.module';
import { usersModule } from './main/content/users/users.module';
import { UserService } from './main/content/sample/user.service';
import { ManageuserService } from './main/content/users/services/manageuser.service';
import { FormsModule, ReactiveFormsModule,NgModel  } from '@angular/forms';


//import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
//import { SocialmedialoginComponent } from '../socialmedialogin/socialmedialogin.component';

//import { UserdetailviewComponent } from './userdetailview/userdetailview.component';

//import { AdduserComponent } from './main/content/users/tabs/adduser/adduser.component';
//import { ViewuserComponent } from './main/content/users/tabs/viewuser/viewuser.component';

//import { SearchModule } from './search/search.module';
//import { UsersComponent } from './users/users.component';
//import { RegisterComponent } from './main/content/register/register.component';
//import { LoginComponent } from './main/content/login/login.component';
 
// Configs 
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("359629304528031")
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("797917536634-44trvujnahaeckh055lgh090muu851qi.apps.googleusercontent.com")
          }
        ]);
    return config;
  }
const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'Login'
    }
];
   
@NgModule({
    declarations: [
        AppComponent        
                       
    ],
    imports     : [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDl7mxzn73b215LyNPY7nlV9IC4arkxjLA",
            libraries: ["places"]
          }),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
        FuseLoginModule,
        AuditRegistorModule,
        Forgotpasswordmodule,
        CreatetemplateModule,       
        resetpasswordModule,
        socialregisterModule,
         // Social media login
        SocialLoginModule,
        testModule,
        usersModule,HelpPageModule,
        FormsModule, ReactiveFormsModule ,MatButtonModule, MatIconModule
    ],
    providers: [        
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        },
         UserService,
         ManageuserService
      ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{

}

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

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { FuseLoginModule } from './main/content/login/login.module';
import { AuditRegistorModule } from './main/content/register/register.module';
import { Forgotpasswordmodule } from './main/content/forgotpassword/forgotpassword.module';
import { CreatetemplateModule } from './main/content/createtemplate/createtemplate.module';
import { TestComponent } from './test/test.component';
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
        AppComponent,
        TestComponent   
    ],
    imports     : [
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
         // Social media login
        SocialLoginModule
    ],
    providers: [        
        {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
        }
      ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{

}

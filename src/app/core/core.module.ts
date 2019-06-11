import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angular-6-social-login';

import { AuthModule } from './auth/auth.module';
import { AuthenticationService, getAuthServiceConfigs } from './auth/auth.service';
import {UserModule} from './shell/user-layout/user.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialLoginModule,
    AuthModule,
    UserModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthService
  ],
  exports: [],
})
export class CoreModule { }

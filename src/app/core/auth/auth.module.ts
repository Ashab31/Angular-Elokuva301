import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from './auth.service';
import { authReducer } from './store/index';

import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('Auth', authReducer)
  ],
  providers: [
    AuthenticationService, AuthGuard
  ],
  exports: []
})
export class AuthModule {}

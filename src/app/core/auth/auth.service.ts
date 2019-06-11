import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GoogleLoginProvider,
  AuthServiceConfig,
  AuthService
} from 'angular-6-social-login';
import * as _ from 'lodash';
import { AuthGuard } from './auth.guard';
import { DataService } from '../../shared/services/data.service';
import * as authReducer from './store/auth-reducers/reducer';
import * as AUTH from './store/auth-actions/actions';
import { RouterModule, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private dataService: DataService,
    private socialAuthService: AuthService,
    private store: Store<authReducer.State>,
    private _router: Router
  ) {
    this.checkLocalStorage();
  }

  login(cb?) {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData => {
      if (cb) {
        cb(true);
      }
      this.store.dispatch(new AUTH.SetAuthenticated());
      // localStorage.setItem('currentUser', JSON.stringify(userData));
      const users = this.dataService.getAllUsers().subscribe(res => {
        const userList: any = res;
        const findIndex = _.findIndex(userList, { id: Number(userData.id) });
        if (findIndex > -1) {
          const matchUser = userList[findIndex];
          // this.store.dispatch(new AUTH.SetUserDetails(matchUser));
          this.setUserDetails(matchUser);
          if (matchUser.role === 'Admin') {
            this._router.navigate(['admin']);
          }
        } else {
          const userId = Number(userData.id);
          const userdata = {
            id: userId,
            name: userData.name,
            email: userData.email,
            role: 'Standard'
          };
          this.dataService.addUserDetails(userdata).subscribe(user => {
            // this.store.dispatch(new AUTH.SetUserDetails(userdata));
            this.setUserDetails(userdata);
          });
        }
      },
        error => {
          console.log('errorblock', error);
        }
      );
    });
  }

  logout() {
    this.socialAuthService.signOut().then(userData => {
      this.store.dispatch(new AUTH.SetUnAuthenticated());
      localStorage.removeItem('currentUser');
      this._router.navigate(['users/movies']);
    });
  }
  checkLocalStorage() {
    const userExists = JSON.parse(localStorage.getItem('currentUser'));
    if (userExists != null) {
      // this.store.dispatch(new AUTH.SetUserDetails(userExists));
      this.setUserDetails(userExists);
      this.store.dispatch(new AUTH.SetAuthenticated());
    }
  }

  setUserDetails(data) {
    if (data) {
      this.store.dispatch(new AUTH.SetUserDetails(data));
      localStorage.setItem('currentUser', JSON.stringify(data));
    }
  }

}

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '282188877004-e4o3s71q315mna6i6j7nujsp7d99b719.apps.googleusercontent.com'
      )
    }
  ]);
  return config;
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as authReducer from '../../../auth/store/index';
import * as AUTH from '../../../auth/store/index';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isAuth: Observable<boolean>;
  userDetails: Observable<any>;

  constructor(
    private auth: AuthenticationService,
    private store: Store<authReducer.State>,
  ) { }

  ngOnInit() {
    this.isAuth = this.store.select(authReducer.getAuthStatus);
    this.userDetails = this.store.select(authReducer.getUserDetails);
  }

  logout() {
    this.auth.logout();
  }

}

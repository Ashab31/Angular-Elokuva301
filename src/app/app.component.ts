import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval } from 'rxjs';

import * as authReducer from './core/auth/store/index';
import { AuthenticationService } from './core/auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elokuva';

  constructor(
    private store: Store<authReducer.State>,
    private auth: AuthenticationService,
    public update: SwUpdate,
    private snackbar: MatSnackBar,
    private dataService: DataService
  ) {
    this.dataService.getMasterData();
  }

  ngOnInit() {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}

import { element } from 'protractor';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { AuthenticationService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as authReducer from '../../../auth/store/index';
import * as AUTH from '../../../auth/store/index';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CourseDialogComponentComponent } from '././../course-dialog-component/course-dialog-component.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isAuth: Observable<boolean>;
  userDetails: Observable<any>;
  isTracking: boolean;
  currentLat: any;
  currentLong: any;
  UserExists = JSON.parse(localStorage.getItem('currentUser'));
  otherTheme = false;
  themes: any = [
    { theme: 'DarkTheme', value: 'Dark Theme' },
    { theme: 'LightTheme', value: 'Light Theme' }

  ];
  constructor(
    private auth: AuthenticationService,
    private store: Store<authReducer.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isAuth = this.store.select(authReducer.getAuthStatus);
    this.userDetails = this.store.select(authReducer.getUserDetails);
  }

  ngAfterViewInit() {
    const city = localStorage.getItem('city');
    if (city === null) {
      setTimeout(() => {
        this.openDialog();
      });
    }
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
  /**select city dialog */

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'citySelection';
    this.dialog.open(CourseDialogComponentComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.closeOnNavigation = true;
  }

  /**
   * Search Dialog
   */
  searchDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'searchDialog';
    this.dialog.open(SearchComponent, dialogConfig);
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.closeOnNavigation = true;
  }

  changeTheme() {
    document.getElementById('layout').classList.add('alternativeTheme');
    // this.otherTheme = !this.otherTheme;
  }
  onChange(eve) {
    this.themes.forEach(item => {
      document.getElementById('layout').classList.remove(item.theme);
    });
    if (eve.value) {
    document.getElementById('layout').classList.add(eve.value);
    }
  }
}

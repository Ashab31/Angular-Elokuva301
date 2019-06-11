import { take, map, tap } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad
} from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { Route } from '@angular/compiler/src/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {
  authStatus = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  canLoad(route: Route): Observable<boolean> | boolean {
    return true;
  }
}

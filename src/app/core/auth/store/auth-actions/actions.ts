import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set UnAuthenticated';
export const SET_USER_DETAILS = '[Auth] Set User Details';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUserDetails implements Action {
  readonly type = SET_USER_DETAILS;

  constructor(public payload: any) {}
}

export type AuthActions = SetUserDetails | SetAuthenticated | SetUnAuthenticated ;

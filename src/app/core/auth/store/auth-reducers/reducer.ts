import { Action } from '@ngrx/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_DETAILS, AuthActions } from '../auth-actions/actions';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  isAuthenticated?: boolean;
  userDetails?: object;
}

const initialState: State = {
  isAuthenticated: false,
  userDetails: null
};

export function authReducer(state: any = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
    default:
      return state;
  }
}

export const getState = createFeatureSelector<State>('Auth');

export const getUserDetails = createSelector(getState, (state: State) => state.userDetails);
export const getAuthStatus = createSelector(getState, (state: State) => state.isAuthenticated );


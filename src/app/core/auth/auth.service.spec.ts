import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AuthService } from 'angular-6-social-login';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    const storeStub = { dispatch: () => ({}) };
    const authServiceStub = {
      signIn: () => ({ then: () => ({}) }),
      signOut: () => ({ then: () => ({}) })
    };
    const dataServiceStub = {
      getAllUsers: () => ({ subscribe: () => ({}) }),
      addUserDetails: () => ({ subscribe: () => ({}) })
    };
    const routerStub = { navigate: () => ({}) };
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Store, useValue: storeStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: DataService, useValue: dataServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    spyOn(AuthenticationService.prototype, 'checkLocalStorage');
    service = TestBed.get(AuthenticationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        AuthenticationService.prototype.checkLocalStorage
      ).toHaveBeenCalled();
    });
  });
  describe('login', () => {
    it('makes expected calls', () => {
      const userData = {id: '101655280470396212885', name: 'Elokuva A', email: 'elokuva.app@gmail.com'};
      // const storeStub = TestBed.get(Store);
      // const authServiceStub: AuthService = TestBed.get(AuthService);
      // const dataServiceStub: DataService = TestBed.get(DataService);
      // const routerStub: Router = TestBed.get(Router);
      // spyOn(storeStub, 'dispatch');
      // spyOn(authServiceStub, 'signIn');
      // spyOn(dataServiceStub, 'getAllUsers');
      // spyOn(dataServiceStub, 'addUserDetails');
      // spyOn(routerStub, 'navigate');
      service.login();
      // expect(storeStub.dispatch).toHaveBeenCalled();
      // expect(dataServiceStub.getAllUsers).toHaveBeenCalled();
      // expect(dataServiceStub.addUserDetails).toHaveBeenCalled();
      // expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      // const storeStub = TestBed.get(Store);
      // const authServiceStub: AuthService = TestBed.get(AuthService);
      // const routerStub: Router = TestBed.get(Router);
      // spyOn(storeStub, 'dispatch');
      // spyOn(authServiceStub, 'signOut');
      // spyOn(routerStub, 'navigate');
      const findIndex = 0;
      service.logout();
      // expect(storeStub.dispatch).toHaveBeenCalled();
      // expect(authServiceStub.signOut).toHaveBeenCalled();
      // expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('checkLocalStorage', () => {
    it('makes expected calls', () => {
      // const storeStub = TestBed.get(Store);
      // spyOn(storeStub, 'dispatch');
      // (<jasmine.Spy>service.checkLocalStorage).and.callThrough();
      service.checkLocalStorage();
      // expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});

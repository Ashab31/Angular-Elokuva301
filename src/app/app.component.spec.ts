import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from './core/auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const storeStub = { select: () => ({}) };
    const authenticationServiceStub = { login: () => ({}), logout: () => ({}) };
    const swUpdateStub = {
      isEnabled: {},
      checkForUpdate: () => ({ then: () => ({}) }),
      available: { subscribe: () => ({}) },
      activated: { subscribe: () => ({}) }
    };
    const matSnackBarStub = {
      open: () => ({ onAction: () => ({ subscribe: () => ({}) }) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: SwUpdate, useValue: swUpdateStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('title defaults to: elokuva', () => {
    expect(component.title).toEqual('elokuva');
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
       const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select');
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
  describe('login', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'login');
      component.login();
      expect(authenticationServiceStub.login).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'logout');
      component.logout();
      expect(authenticationServiceStub.logout).toHaveBeenCalled();
    });
  });
});

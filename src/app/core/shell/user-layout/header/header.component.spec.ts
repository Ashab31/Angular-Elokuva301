import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/core/material/material.module';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(() => {
    const authenticationServiceStub = { login: () => ({}), logout: () => ({}) };
    const storeStub = { select: () => ({}) };
    const matDialogStub = { open: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports : [MaterialModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Store, useValue: storeStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('otherTheme defaults to: false', () => {
    expect(component.otherTheme).toEqual(false);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select');
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'openDialog');
      component.ngAfterViewInit();
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
  describe('openDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open');
      component.openDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
  describe('searchDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open');
      component.searchDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});

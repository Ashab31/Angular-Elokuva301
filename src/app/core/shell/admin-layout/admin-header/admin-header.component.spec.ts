import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AdminHeaderComponent } from './admin-header.component';
import { MaterialModule } from 'src/app/core/material/material.module';

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;
  beforeEach(() => {
    const authenticationServiceStub = { logout: () => ({}) };
    const storeStub = { select: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminHeaderComponent],
      imports : [MaterialModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select');
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
});

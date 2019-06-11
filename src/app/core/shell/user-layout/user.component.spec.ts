import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { UserComponent } from './user.component';
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  beforeEach(() => {
    const utilsServiceStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserComponent],
      providers: [{ provide: UtilsService, useValue: utilsServiceStub }]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
    describe('ngOnInit', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSideNavComponent } from './admin-side-nav.component';
describe('AdminSideNavComponent', () => {
  let component: AdminSideNavComponent;
  let fixture: ComponentFixture<AdminSideNavComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminSideNavComponent]
    });
    fixture = TestBed.createComponent(AdminSideNavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});

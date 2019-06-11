import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddShowsComponent } from './add-shows.component';
describe('AddShowsComponent', () => {
  let component: AddShowsComponent;
  let fixture: ComponentFixture<AddShowsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddShowsComponent]
    });
    fixture = TestBed.createComponent(AddShowsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
   describe('ngOnInit', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      fixture.detectChanges();
    });
  });
  describe(' addTimes to have been called', () => {
    it('makes expected calls', () => {
      const minutesValue = '30';
      const hoursValue = '4';
      component.addTimes();
      fixture.detectChanges();
    });
  });
});

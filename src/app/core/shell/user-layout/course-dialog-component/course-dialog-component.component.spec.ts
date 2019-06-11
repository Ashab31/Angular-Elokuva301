import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MoviesService } from '../../../../movies/movies.service';
import { CourseDialogComponentComponent } from './course-dialog-component.component';
import { appConstants } from '../../../../config/constants';

describe('CourseDialogComponentComponent', () => {
  let component: CourseDialogComponentComponent;
  let fixture: ComponentFixture<CourseDialogComponentComponent>;
  beforeEach(() => {
    const matDialogRefStub = { close: () => ({}) };
    const moviesServiceStub = { getTheatresList: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CourseDialogComponentComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MoviesService, useValue: moviesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CourseDialogComponentComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('cityList defaults to: appConstants.cityList', () => {
    expect(component.cityList).toEqual(appConstants.cityList);
  });
    describe('ngOnInit', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
    });
  });
});

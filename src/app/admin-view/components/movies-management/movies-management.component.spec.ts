import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgZone } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { MoviesManagementComponent } from './movies-management.component';
import { MaterialModule } from 'src/app/core/material/material.module';
describe('MoviesManagementComponent', () => {
  let component: MoviesManagementComponent;
  let fixture: ComponentFixture<MoviesManagementComponent>;
  beforeEach(() => {
    const ngZoneStub = { run: () => ({}) };
    const dataServiceStub = {
      searchMovies: () => ({ subscribe: () => ({}) }),
      getMovieDetails: () => ({ subscribe: () => ({}) }),
      updateTheatre: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
       imports : [MaterialModule],
      declarations: [MoviesManagementComponent],
      providers: [
        { provide: NgZone, useValue: ngZoneStub },
        { provide: DataService, useValue: dataServiceStub },
      ]
    });
    fixture = TestBed.createComponent(MoviesManagementComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('visible defaults to: true', () => {
    expect(component.visible).toEqual(true);
  });
  it('selectable defaults to: true', () => {
    expect(component.selectable).toEqual(true);
  });
  it('removable defaults to: true', () => {
    expect(component.removable).toEqual(true);
  });
  it('addOnBlur defaults to: true', () => {
    expect(component.addOnBlur).toEqual(true);
  });
  it('fruits defaults to: []', () => {
    expect(component.fruits).toEqual([]);
  });
  it('allFruits defaults to: []', () => {
    expect(component.allFruits).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getMoviesDetails');
      component.ngOnInit();
      expect(component.getMoviesDetails).toHaveBeenCalled();
    });
  });
  describe('getMoviesDetails', () => {
    it('makes expected calls', () => {
      const ngZoneStub: NgZone = fixture.debugElement.injector.get(NgZone);
      const dataServiceStub: DataService = fixture.debugElement.injector.get(
        DataService
      );
      spyOn(ngZoneStub, 'run');
      spyOn(dataServiceStub, 'getMovieDetails');
      component.getMoviesDetails();
      expect(ngZoneStub.run).toHaveBeenCalled();
      expect(dataServiceStub.getMovieDetails).toHaveBeenCalled();
    });
  });
});

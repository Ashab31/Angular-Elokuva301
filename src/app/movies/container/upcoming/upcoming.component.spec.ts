import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesService } from 'src/app/movies/movies.service';
import { UpcomingComponent } from './upcoming.component';
import { MoviesFilterPipe } from '../../../shared/pipes/movies-filter.pipe';

describe('UpcomingComponent', () => {
  let component: UpcomingComponent;
  let fixture: ComponentFixture<UpcomingComponent>;
  beforeEach(() => {
    const storeStub = { select: () => ({}) };
    const moviesServiceStub = {
      getUpcomingMovies: () => ({}),
      upComingTotalPage: {}
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UpcomingComponent, MoviesFilterPipe],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: MoviesService, useValue: moviesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UpcomingComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('currentPage defaults to: 1', () => {
    expect(component.currentPage).toEqual(1);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub = fixture.debugElement.injector.get(Store);
      const moviesServiceStub: MoviesService = fixture.debugElement.injector.get(
        MoviesService
      );
      spyOn(storeStub, 'select');
      spyOn(moviesServiceStub, 'getUpcomingMovies');
      component.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
      // expect(moviesServiceStub.getUpcomingMovies).toHaveBeenCalled();
    });
  });
});

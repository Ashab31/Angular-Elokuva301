import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../movies.service';
import { DetailComponent } from './detail.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { environment } from 'src/environments/environment';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  beforeEach(() => {
    const dataServiceStub = {
      getMovieDetails: () => ({ subscribe: () => ({}) }),
      getCastNCrew: () => ({ subscribe: () => ({}) })
    };
    const activatedRouteStub = { queryParams: { subscribe: () => ({}) } };
    const moviesServiceStub = { isMoviePlayingInThatre: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports : [MaterialModule],
      declarations: [DetailComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MoviesService, useValue: moviesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('cards defaults to: 5', () => {
    expect(component.cards).toEqual(5);
  });
  it('height defaults to: 100%', () => {
    expect(component.height).toEqual('100%');
  });
  it('halfStar defaults to: 0', () => {
    expect(component.halfStar).toEqual(0);
  });
  it('fullStar defaults to: []', () => {
    expect(component.fullStar).toEqual([]);
  });
  it('emptyStar defaults to: []', () => {
    expect(component.emptyStar).toEqual([]);
  });
  it('MOVIE_IMAGE_URL defaults to: environment.movies.MOVIE_IMAGE_URL', () => {
    expect(component.MOVIE_IMAGE_URL).toEqual(
      environment.movies.MOVIE_IMAGE_URL
    );
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      // spyOn(component, 'getMoviesDetails');
      component.ngOnInit();
      // expect(component.getMoviesDetails).toHaveBeenCalled();
    });
  });
});

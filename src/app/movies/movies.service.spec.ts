import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { DataService } from '../shared/services/data.service';
import { MoviesService } from './movies.service';
import { environment } from '../../environments/environment';
import { appConstants } from '../config/constants';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    const httpClientStub = { get: () => ({ subscribe: () => ({}) }) };
    const storeStub = { dispatch: () => ({}) };
    const dataServiceStub = { theatresList: {} };
    TestBed.configureTestingModule({
       imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        MoviesService,
        { provide: Store, useValue: storeStub },
        { provide: DataService, useValue: dataServiceStub },
        { provide: HttpClient, useValue: {} }
      ]
    });
    service = TestBed.get(MoviesService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('MOVIES defaults to: environment.movies', () => {
    expect(service.MOVIES).toEqual(environment.movies);
  });
  it('API defaults to: environment.api', () => {
    expect(service.API).toEqual(environment.api);
  });
  it('DEFAULT_CITY defaults to: appConstants.defaultCity', () => {
    expect(service.DEFAULT_CITY).toEqual(appConstants.defaultCity);
  });
  it('theatresCity defaults to: []', () => {
    expect(service.theatresCity).toEqual([]);
  });
   it('getTheatresID', () => {
     const theatresList = [{ city : 'Bangalore'}];
    service.getTheatresList('Bangalore');
  });
   it('isMoviePlayingInThatre', () => {
    service.isMoviePlayingInThatre('12344');
  });
});

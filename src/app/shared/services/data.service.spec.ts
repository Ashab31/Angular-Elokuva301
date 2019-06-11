import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';
describe('DataService', () => {
  let service: DataService;
   const User = {
      id: '12333',
      name: 'Ankita',
      email: 'ankita.naduvinamani2@mindtree.com',
      role: 'Standard'
    };
    const id = '12333';
    const query = 'value';
    const page = 1;
    const data = { test : 'test'};
    const params = {test : 'test' };
    const theatreSucc = { id  : '133', name : 'INOX'};
  //  let comp: AddTheaterComponent;
  beforeEach(() => {
    const httpClientStub = {
      get: () => ({}),
      post: () => ({}),
      put: () => ({})
    };
    TestBed.configureTestingModule({
      providers: [DataService, { provide: HttpClient, useValue: httpClientStub }]
    });
    spyOn(DataService.prototype, 'getMasterData');
    service = TestBed.get(DataService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('API defaults to: environment.api', () => {
    expect(service.API).toEqual(environment.api);
  });
  it('MOVIES defaults to: environment.movies', () => {
    expect(service.MOVIES).toEqual(environment.movies);
  });
  // it('cityList defaults to: [, , ,]', () => {
  //   expect(service.cityList).toEqual([ , , , , ]);
  // });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(DataService.prototype.getMasterData).toHaveBeenCalled();
    });
  });
  describe('getAllUsers', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get');
      service.getAllUsers();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
  describe('getLanguages', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get');
      service.getLanguages();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
  describe('getGenres', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get');
      service.getGenres();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
  describe('getMasterData', () => {
    it('makes expected calls', () => {
    });
  });
  describe('getSeatsReserved', () => {
    it('makes expected calls', () => {
      const httpClientStub: HttpClient = TestBed.get(HttpClient);
      spyOn(httpClientStub, 'get');
      service.getSeatsReserved();
      expect(httpClientStub.get).toHaveBeenCalled();
    });
  });
  it('addUserDetails', () => {
    service.addUserDetails(User);
  });
   it('getMovieDetails', () => {
    service.getMovieDetails(id);
  });
  it('getCastNCrew', () => {
    service.getCastNCrew(id);
  });
   it('searchMovies', () => {
    service.searchMovies(query, page);
  });
    it('searchMovies', () => {
    service.popularMovies(page);
  });
   it('getTheatresList', () => {
    service.getTheatresList();
  });
    it('getMasterData', () => {
    service.getMasterData();
  });
     it('getMasterData', () => {
    service.getMasterData();
  });
  it('updateTheatre', () => {
    service.updateTheatre(id, data);
  });
  it('createTheatre', () => {
    service.createTheatre(data);
  });
   it('bookTickets', () => {
    service.bookTickets(params);
  });
   it('updateBookTickets', () => {
    service.updateBookTickets(id, params);
  });
    it('getTheatresID', () => {
    service.getTheatresID(id);
  });
});

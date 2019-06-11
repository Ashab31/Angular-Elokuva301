import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API = environment.api;
  MOVIES = environment.movies;
  languagesList;
  genresList;
  theatresList;
  cityList = [
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Bhubaneswar', label: 'Bhubaneswar' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];
  constructor(private http: HttpClient) {
    // this.getMasterData();
  }

  getAllUsers() {
    return this.http.get(this.API.USERS);
  }

  addUserDetails(User) {
    return this.http.post(this.API.USERS, User);
  }

  updateUser(data, id) {
    return this.http.put(this.API.USERS + `/${id}`, data);
  }

  searchMovies(query, page) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page,
      query: query
    };
    return this.http.get(this.MOVIES.SEARCH, { params: params });
  }

  popularMovies(page) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    return this.http.get(this.MOVIES.POPULAR, { params: params });
  }

  /**
   * Get Details of Movie
   */
  getMovieDetails(id) {
    const params = {
      api_key: this.MOVIES.API_KEY
    };
    return this.http.get(this.MOVIES.BASE_URL + `${id}`, { params: params });
  }

  getCastNCrew(id) {
    const params = {
      api_key: this.MOVIES.API_KEY
    };
    return this.http.get(this.MOVIES.BASE_URL + `${id}/credits`, { params: params });
  }

  getTheatresList() {
    return this.http.get(this.API.THEATRES);
  }

  getLanguages() {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN'
    };
    return this.http.get(this.MOVIES.LANGUAGES, { params: params });
  }

  getGenres() {
    const params = {
      api_key: this.MOVIES.API_KEY
    };
    return this.http.get(this.MOVIES.GENRE, { params: params });
  }

  getMasterData() {
    this.theatreListUpdate();
    this.getLanguages().subscribe(
      langSucc => {
        this.languagesList = langSucc;
      },
      langErr => {}
    );

    this.getGenres().subscribe(
      genreSucc => {
        this.genresList = genreSucc['genres'];
      },
      genreErr => {}
    );
  }

  theatreListUpdate() {
    this.getTheatresList().subscribe(
      theatreSucc => {
        this.theatresList = theatreSucc;
      },
      error => {}
    );
  }

  updateTheatre(id, data) {
    return this.http.put(this.API.THEATRES + `/${id}`, data);
  }
  createTheatre(data) {
    return this.http.post(this.API.THEATRES, data);
  }
  /* send the booking details */
  bookTickets(params) {
    return this.http.post(this.API.BOOKINGS, params);
  }
  /*get details for particular booking id */
  getBookingDetails(id) {
    return this.http.get(this.API.BOOKINGS + `/${id}`);
  }
  updateBookTickets(id, params) {
    return this.http.put(this.API.BOOKINGS + `/${id}`, params);
  }
  /*Get theatre details based on id*/
  getTheatresID(id) {
    return this.http.get(this.API.THEATRES + `/${id}`);
  }
  /*Get reserved seats*/
  getSeatsReserved() {
    return this.http.get(this.API.BOOKINGS);
  }
  getNowPlaying(page) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    return this.http.get(this.MOVIES.NOW_PLAYING, { params: params });
  }
  getUpcoming(page) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    return this.http.get(this.MOVIES.UPCOMING, { params: params });
  }

  getTopRatedMovies(page) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    return this.http.get(this.MOVIES.TOP_RATED, { params: params });
  }
}

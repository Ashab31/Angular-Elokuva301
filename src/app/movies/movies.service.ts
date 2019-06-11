import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

import { Store } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { NowPlaying } from './models/now-playing-movies';

import * as moviesReducer from './store/movies-reducers/reducers';
import * as Movies from './store/index';
import { Promise } from 'q';
import { DataService } from '../shared/services/data.service';
import { appConstants } from '../config/constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: null
})
export class MoviesService implements OnDestroy {
  MOVIES = environment.movies;
  API = environment.api;
  theatresList;
  nowShowingTotelPage;
  upComingTotalPage;
  DEFAULT_CITY = appConstants.defaultCity;
  theatresCity: any = [];
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  constructor(
    private http: HttpClient,
    private moviesStore: Store<moviesReducer.State>,
    private dataService: DataService
  ) {
    setTimeout(() => {
      this.getTheatresList(this.DEFAULT_CITY);
    }, 200);
  }

  /**
   * Get Theatres List
   */
  getTheatresList(selectedItem) {
    const bangaloreTheatres: any = [];
    this.theatresList = _.cloneDeep(this.dataService.theatresList);
    for (let i = 0; i < this.theatresList.length; i++) {
      if (this.theatresList[i].city === selectedItem) {
        bangaloreTheatres.push(this.theatresList[i]);
      }
    }
    this.theatresCity = bangaloreTheatres;
  }

  /**
   * Get Now Playing Movies
   */
  getNowPlayingMovies(page, cb?) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    this.sub = this.http.get<NowPlaying>(this.MOVIES.NOW_PLAYING, { params: params }).subscribe(
      movies => {
        const moviesData: any = movies['results'];
        this.nowShowingTotelPage = movies['total_pages'];
        this.moviesStore.dispatch(new Movies.SetNowshowing(moviesData));
        setTimeout(() => {
          moviesData.forEach(movie => {
            this.getCastAndCrew(movie.id, 'SetCastAndCrew');
            this.getThatres(movie.id, 'SetTheatres');
          });
        }, 200);
        if (cb) {
          cb();
        }
      },
      error => {
        if (cb) {
          cb();
        }
      }
    );
  }

  /**
   * Get Up Coming Movies
   */
  getUpcomingMovies(page, cb?) {
    const params = {
      api_key: this.MOVIES.API_KEY,
      region: 'IN',
      page: page
    };
    this.sub2 = this.http.get<NowPlaying>(this.MOVIES.UPCOMING, { params: params }).subscribe(
      movies => {
        const moviesData: any = movies['results'];
        this.upComingTotalPage = movies['total_pages'];
        this.moviesStore.dispatch(new Movies.SetUpcoming(moviesData));
        setTimeout(() => {
          moviesData.forEach(movie => {
            this.getCastAndCrew(movie.id, 'SetCastAndCrewUpComing');
            this.getThatres(movie.id, 'SetTheatresUpComing');
          });
        });
        if (cb) {
          cb();
        }
      },
      error => {
        if (cb) {
          cb();
        }
      }
    );
  }

  /**
   * Get Thatres
   * @param id - Movie ID
   */
  getThatres(id, action) {
    const theatres = this.isMoviePlayingInThatre(id);
    if (theatres && theatres.length) {
      this.moviesStore.dispatch(
        new Movies[action]({ id: id, updateValue: { theatres: theatres } })
      );
    }
  }

  /**
   * Get Case And Crew
   * @param id - Movie ID
   */
  getCastAndCrew(id, action) {
    const params = {
      api_key: this.MOVIES.API_KEY
    };
   this.sub3 = this.http
      .get(this.MOVIES.BASE_URL + `${id}/credits`, { params: params })
      .subscribe(res => {
        const credits = _.concat([], res['cast'].slice(0, 3), res['crew'].slice(0, 2));
        this.moviesStore.dispatch(
          new Movies[action]({ id: res['id'], updateValue: { credits: credits } })
        );
      });
  }

  /**
   * Is Movie Playing In Thatre
   * @param id - Movie ID
   */
  isMoviePlayingInThatre(id) {
    const theatres: any = [];
    this.theatresCity.forEach(element => {
      if (element.movies.indexOf(id) > -1) {
        theatres.push({
          id: element.id,
          name: element.name,
          geolocation: element.geolocation,
          seats: element.seats,
          shows: element.shows
        });
      }
    });
    return theatres;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe(); }

}

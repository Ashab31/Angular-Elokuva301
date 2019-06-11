import { Action } from '@ngrx/store';

import { NowPlaying } from '../../models/now-playing-movies';

export const SET_NOWSHOWING = '[Movies] Set Nowshowing';
export const SET_UPCOMING = '[Movies] Set Upcoming';
export const SET_CAST_AND_CREW = '[Movies] Update Nowshowing';
export const SET_THEATRES = '[Theatres] Update Nowshowing';
export const SET_THEATRES_UPCOMING = '[Theatres] Update Upcoming ';
export const SET_CAST_AND_CREW_UPCOMING = '[Movies] Update Upcoming';

interface Movie {
  title: string;
  popularity: string;
  id: number;
  release_date: string;
  poster_path: string;
  overview: string;
}

export class SetNowshowing implements Action {
  readonly type = SET_NOWSHOWING;
  constructor(public payload: NowPlaying) {}
}

export class SetUpcoming implements Action {
  readonly type = SET_UPCOMING;
  constructor(public payload: {}) {}
}

export class SetTheatres implements Action {
  readonly type = SET_THEATRES;
  constructor(public payload: {id: number , updateValue: any}) {}
}

export class SetCastAndCrew implements Action {
  readonly type = SET_CAST_AND_CREW;
  constructor(public payload: {}) {}
}

export class SetTheatresUpComing implements Action {
  readonly type = SET_THEATRES_UPCOMING;
  constructor(public payload: {id: number , updateValue: any}) {}
}

export class SetCastAndCrewUpComing implements Action {
  readonly type = SET_CAST_AND_CREW_UPCOMING;
  constructor(public payload: {}) {}
}


export type MovieActions = SetNowshowing | SetUpcoming | SetTheatres | SetCastAndCrew | SetTheatresUpComing | SetCastAndCrewUpComing ;

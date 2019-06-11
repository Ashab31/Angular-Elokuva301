import { Action } from '@ngrx/store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import {
  SET_NOWSHOWING,
  SET_UPCOMING,
  SET_CAST_AND_CREW,
  SET_THEATRES,
  SET_THEATRES_UPCOMING,
  SET_CAST_AND_CREW_UPCOMING,
  MovieActions
} from '../movies-actions/actions';

export interface State {
  nowShowingMovies?: object;
  upComingMovies?: object;
}

const initialState: State = {
  nowShowingMovies: [],
  upComingMovies: []
};


export function moviesReducer(state: any = initialState, action: MovieActions) {
  switch (action.type) {
    case SET_NOWSHOWING:
      return {
        ...state,
        nowShowingMovies: state.nowShowingMovies.concat(action.payload)
      };
    case SET_UPCOMING:
      return {
        ...state,
        upComingMovies: state.upComingMovies.concat(action.payload)
      };
      case SET_THEATRES: {
        return updateNowShowing();
      }
      case SET_CAST_AND_CREW: {
        return updateNowShowing();
      }
      case SET_THEATRES_UPCOMING: {
        return updateUpComing();
      }
      case SET_CAST_AND_CREW_UPCOMING: {
        return updateUpComing();
      }
    default:
      return state;
  }

  /**
   * Update Now Showing Store
   */
  function updateNowShowing() {
    const targetIndex = _.findIndex(state.nowShowingMovies, {id: action.payload['id']});
    if (targetIndex > -1) {
      _.assignIn(state.nowShowingMovies[targetIndex], action.payload['updateValue']);
    }
    return {
      ...state,
      nowShowingMovies: state.nowShowingMovies
    };
  }

  /**
   * Update Up Coming Store
   */
  function updateUpComing() {
    const targetIndex = _.findIndex(state.upComingMovies, {id: action.payload['id']});
    if (targetIndex > -1) {
      _.assignIn(state.upComingMovies[targetIndex], action.payload['updateValue']);
    }
    return {
      ...state,
      upComingMovies: state.upComingMovies
    };
  }
}

export const getState = createFeatureSelector<State>('Movies');

export const getNowShowing = createSelector(getState, (state: State) => state.nowShowingMovies);
export const getUpComing = createSelector(getState, (state: State) => state.upComingMovies );


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = {
  MOVIES: 'https://api.themoviedb.org/3',
  API: 'http://127.0.0.1:3000',
};

export const environment = {
  production: false,
  movies: {
    BASE_URL: `${BASE_URL.MOVIES}/movie/`,
    NOW_PLAYING: `${BASE_URL.MOVIES}/movie/now_playing`,
    UPCOMING: `${BASE_URL.MOVIES}/movie/upcoming`,
    SEARCH: `${BASE_URL.MOVIES}/search/movie`,
    POPULAR: `${BASE_URL.MOVIES}/movie/popular`,
    LANGUAGES: `${BASE_URL.MOVIES}/configuration/languages`,
    GENRE: `${BASE_URL.MOVIES}/genre/movie/list`,
    API_KEY: '309f7f1cc8181570bfb54089c4b31271',
    MOVIE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500',
    TOP_RATED: `${BASE_URL.MOVIES}/movie/top_rated`,
  },
  api: {
    USERS: `${BASE_URL.API}/users`,
    THEATRES: `${BASE_URL.API}/theatres`,
    BOOKINGS: `${BASE_URL.API}/bookings`,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

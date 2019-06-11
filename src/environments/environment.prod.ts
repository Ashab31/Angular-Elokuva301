const BASE_URL = {
  MOVIES: 'https://api.themoviedb.org/3',
  API: 'http://127.0.0.1:3000',
};

export const environment = {
  production: true,
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

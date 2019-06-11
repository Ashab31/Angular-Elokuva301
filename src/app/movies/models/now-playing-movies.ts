export interface NowPlaying {
  results: Result[];
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}

interface Dates {
  maximum: string;
  minimum: string;
}

interface Result {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

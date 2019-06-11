import { TestBed } from '@angular/core/testing';
import { MoviesFilterPipe } from './movies-filter.pipe';
describe('MoviesFilterPipe', () => {
  let pipe: MoviesFilterPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MoviesFilterPipe] });
    pipe = TestBed.get(MoviesFilterPipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms X to Y', () => {
    const value: any = 'Y';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
   it('filter for language and genre both', () => {
     const array: any = [
      {
        vote_count: 152,
        id: 297802,
        video: false,
        vote_average: 6.7,
        title: 'Aquaman',
        popularity: 435.245,
        poster_path: '/ydUpl3QkVUCHCq1VWvo2rW4Sf7y.jpg',
        original_language: 'en',
        original_title: 'Aquaman',
        genre_ids: [28, 14, 878, 12, 10749],
        backdrop_path: '/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg',
        adult: false,
     }];
    const args = [{language : 'en', genre : 'action'}];
    expect(pipe.transform(array, args));
  });
});

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as moviesReducer from '../../store/movies-reducers/reducers';
import { MoviesService } from 'src/app/movies/movies.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-now-showing',
  templateUrl: './now-showing.component.html',
  styleUrls: ['./now-showing.component.scss']
})

export class NowShowingComponent implements OnInit {
  movie$: Observable<any>;
  currentPage = 1;
  @Input() loadType;
  filterObj;
  bottomProgress;
  noMoreMovies;

  constructor(
    private moviesService: MoviesService,
    private moviesStore: Store<moviesReducer.State>
  ) { }
  ngOnInit() {
    this.bottomProgress = false;
    this.noMoreMovies = false;
    if (this.loadType === 'onLoad') {
      this.moviesService.getNowPlayingMovies(this.currentPage);
    }
    this.movie$ = this.moviesStore.select(moviesReducer.getNowShowing);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    const dialog = document.getElementsByClassName('mat-dialog-container');
    if (Math.round(pos) === max && dialog.length === 0) {
      if (this.moviesService.nowShowingTotelPage > this.currentPage) {
        this.bottomProgress = true;
        this.currentPage ++;
        this.moviesService.getNowPlayingMovies(this.currentPage, () => {
          this.bottomProgress = false;
        });
      } else {
        this.noMoreMovies = true;
      }
    }
  }
  trackByFn(index, item) {
    return index;
  }
}

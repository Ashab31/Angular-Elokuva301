import { getUpComing } from './../../store/movies-reducers/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, HostListener } from '@angular/core';

import * as moviesReducer from '../../store/movies-reducers/reducers';
import { MoviesService } from 'src/app/movies/movies.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {
   movie$: Observable<any>;
   noMoreMovies;
  currentPage = 1;
  @Input() loadType;
  @Input() changeCount;
  filterObj;
  bottomProgress;

  constructor( private moviesService: MoviesService,
    private moviesStore: Store<moviesReducer.State>) { }

  ngOnInit() {
    this.bottomProgress = false;
    this.noMoreMovies = false;
    if (this.loadType === 'onChange' && this.changeCount === 1) {
      this.moviesService.getUpcomingMovies(this.currentPage);
    }
    this.movie$ = this.moviesStore.select(moviesReducer.getUpComing);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    const dialog = document.getElementsByClassName('mat-dialog-container');
    if (Math.round(pos) === max && dialog.length === 0 ) {
      if (this.moviesService.upComingTotalPage > this.currentPage) {
        this.currentPage ++;
        this.bottomProgress = true;
        this.moviesService.getUpcomingMovies(this.currentPage, () => {
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

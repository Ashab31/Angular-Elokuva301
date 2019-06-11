import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, DoCheck } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { environment } from './../../../../environments/environment';
import { BookingComponent } from '../../../shared/components/booking/booking.component';
import { UnauthorizedUserComponent } from '../../../shared/components/unauthorized-user/unauthorized-user.component';
import * as authReducer from '../../../core/auth/store/index';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieListComponent implements OnInit, DoCheck, OnDestroy {
  isAuth;
  userDetails: Observable<any>;
  @Input() detail;
  @Input() type;
  theaterSelected;
  showTiming;
  MOVIE_IMAGE_URL = environment.movies.MOVIE_IMAGE_URL;
  todayDate = new Date();
  showDate;
  rating;
  halfStar = 0;
  fullStar = [];
  emptyStar = [];
  minDate = new Date();
  theatreID;
  theatreObj;
  shows;
  currentTime;
  dateSelected = new Date();
  dateFormat = require('dateformat');
  defaultTheatre;
  sub: Subscription;
  constructor(
    private dialog: MatDialog,
    private store: Store<authReducer.State>
  ) { }

  ngOnInit() {
    this.rating = this.detail.vote_average / 2;
    const star = Math.trunc(this.rating);
    if (this.rating - star >= 0.5) {
      this.halfStar = 1;
    }
    const blank = 5 - star - this.halfStar;
    this.fullStar = Array(star).fill(1);
    this.emptyStar = Array(blank).fill(1);

    if (this.type === 'nowShowing') {
      this.minDate = this.todayDate;
    } else {
      this.minDate = new Date(this.todayDate.getTime() + 86400000);
    }

    this.sub = this.store.select(authReducer.getAuthStatus).subscribe(res => {
      this.isAuth = res;
    });
  }

  ngDoCheck(): void {
    if (this.detail.theatres && this.detail.theatres.length && this.detail.theatres.length === 1) {
      this.defaultTheatre = this.detail.theatres[0];
      const data = {
        value: this.detail.theatres[0]
      };
      this.onSelection(data);
    }
  }

  onSelection(event) {
    this.theaterSelected = event.value.name;
    this.theatreID = event.value.id;
    this.theatreObj = event.value;
    this.shows = event .value.shows;
    this.dateFormat.masks.hammerTime = 'HH:MM';
  }

  compareTime(show1) {
    const today = new Date();
    const currentTime = this.dateFormat(today, 'hammerTime');
    if (show1 === currentTime) {
      return false;
    }
    const time1 = show1.split(':');
    const time2 = currentTime.split(':');
    if (time1[0] > time2[0]) {
      return true;
    } else if ((time1[0] === time2[0]) && (time1[1] > time2[1])) {
      return true;
    } else {
      return false;
    }
  }


  onChnage(change) {
    this.showTiming = change.value;
  }

  addEvent(event) {
    this.dateSelected = event.value;
  }
  openBooking() {
      if (this.isAuth) {
          this.userDetails = this.store.select(authReducer.getUserDetails);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.id = 'bookingDialog';
          dialogConfig.data = {
            theatre: this.theaterSelected,
            showTime: this.showTiming,
            movieName: this.detail.title,
            theatreID: this.theatreID,
            movieID: this.detail.id,
            dateSelected: this.dateSelected,
            seats: this.theatreObj.seats
          };
          dialogConfig.position = {
            top: '0',
            left: '0'
          };
          const dialogRef = this.dialog.open(BookingComponent, dialogConfig);
      } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          const dialogRef = this.dialog.open(UnauthorizedUserComponent, dialogConfig);
      }
  }
  trackByFn(index, item) {
    return index;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();  }
}

import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MoviesService } from '../../movies.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import * as _ from 'lodash';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BookingComponent } from 'src/app/shared/components/booking/booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  totalSeats: any;
  ccDetails;
  urlParams;
  movieDetails$;
  theatresList;
  crews: any;
  castPluscrew;
  castPluscrew2: string[];
  cards = 5;
  showTimng;
  shwDate;
  selectedDate;
  ID;
  casts: any;
  movieID;
  theatreID;
  showSelected;
  date;
  show;
  voteAvg;
  theatreValue;
  castDetails;
  crewDetails;
  castprofiles;
  height = '100%';
  rating;
  halfStar = 0;
  fullStar = [];
  emptyStar = [];
  theaterSelected;
  latitude;
  longitude;
  shows;
  events: string[] = [];
  sub: Subscription;
  MOVIE_IMAGE_URL = environment.movies.MOVIE_IMAGE_URL;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private movieService: MoviesService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.urlParams = params;
      this.movieID = +params.movieId;
      this.theatreValue = Number(params.theatreId);
      this.shwDate = new Date(params.showDate);
      this.getMoviesDetails(this.movieID);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showTimng = this.urlParams.showTime;
      this.cdr.detectChanges();
    }, 500);

  }

  theatreChnage() {
    this.updateTheatre();
    setTimeout(() => {
      this.showTimng = '';
      this.cdr.detectChanges();
    });
  }

  CalculateRating() {
    this.rating = this.voteAvg / 2;
    const star = Math.trunc(this.rating);
    if (this.rating - star >= 0.5) {
      this.halfStar = 1;
    }
    const blank = 5 - star - this.halfStar;
    this.fullStar = Array(star).fill(1);
    this.emptyStar = Array(blank).fill(1);
  }

  getMoviesDetails(movieId) {
    this.sub = this.dataService.getMovieDetails(movieId).subscribe(success => {
      this.movieDetails$ = success;
      this.voteAvg = this.movieDetails$.vote_average;
      this.CalculateRating();
      this.castNCrewDetails(this.movieID);
    }, error => { }
    );
  }
hashTag(movieTitle) {
  if (movieTitle) {
    const str = movieTitle.replace(/[^a-zA-Z0-9]/g, '');
    const hashTag = str.toUpperCase();
     return hashTag;
  }
}
  castNCrewDetails(Id) {
    this.dataService.getCastNCrew(Id).subscribe(success => {
      // tslint:disable-next-line:prefer-const
      const castCrew: any = success;
      const castprofiles = castCrew.cast;
      this.casts = castprofiles;
      const crewprofiles = castCrew.crew;
      this.crews = crewprofiles;
      const combined = castprofiles.concat(crewprofiles);
      this.castDetails = _.map(castprofiles, (element) => {
        return element.profile_path ? this.MOVIE_IMAGE_URL + element.profile_path : '';
      });
      this.crewDetails = _.map(crewprofiles, (element) => {
        return element.profile_path ? this.MOVIE_IMAGE_URL + element.profile_path : '';
      });
      this.castPluscrew2 = _.map(combined, (element) => {
        return element.profile_path ? this.MOVIE_IMAGE_URL + element.profile_path : '';
      });
      const castDet = _.slice(castprofiles, 0, 3);
      const crewDet = _.slice(crewprofiles, 0, 2);
      this.castPluscrew = castDet.concat(crewDet);
      this.isMoviePlayingInTheatre(this.movieID);
    }, error => { }
    );
  }

  isMoviePlayingInTheatre(movieId) {
    this.theatresList = this.movieService.isMoviePlayingInThatre(movieId);
    this.updateTheatre();
  }

  onChnage(change) {
    this.showTimng = change.value;
  }
  updateTheatre() {
    this.theaterSelected = _.find(this.theatresList, { id: this.theatreValue });
    if (this.theaterSelected) {
      this.shows = this.theaterSelected.shows;
      this.totalSeats = this.theaterSelected.seats;
      const location = this.theaterSelected.geolocation.split(',');
      this.latitude = +location[0];
      this.longitude = +location[1];
    }
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }
  openBooking() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'bookingDialog';
    dialogConfig.data = {
      theatre: this.theaterSelected.name,
      showTime: this.showTimng,
      movieName: this.movieDetails$.title,
      theatreID: this.theatreValue,
      movieID: this.movieDetails$.id,
      dateSelected: this.shwDate,
      seats: this.totalSeats
    };
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    const dialogRef = this.dialog.open(BookingComponent, dialogConfig);
  }
  trackByFn(index, item) {
    return index;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();  }
}

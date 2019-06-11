import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';
import * as _ from 'lodash';
import { AuthenticationService } from './../../../core/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  // variable declarations
  sub: Subscription;
  movieTitle = this.data.movieName;
  screen = this.data.theatre;
  time = this.data.showTime;
  theatreID = this.data.theatreID;
  movieID = this.data.movieID;
  dateSelected = this.data.dateSelected;
  noOfSeats;
  selected: string[] = [];
  seats;
  bookingData;
  bookingObj;
  reserved: string[] = [];
  theatreExists: any;
  date = this.dateSelected.toISOString();
  constructor(
    public dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private authservice: AuthenticationService
  ) {}
  ngOnInit() {
    this.getNumberOfSeats();
    this.getSeatReserved();
  }

  /*get total number of seats available in the selected theatre*/
  getNumberOfSeats() {
    this.seats = _.map(_.range(1, this.data.seats + 1), num => {
      return num + '';
    });
    // this.moviesService.getTheatresID(this.theatreID).subscribe(data => {
    //   this.noOfSeats = data;
    //   this.seats = _.map(_.range(1, this.noOfSeats.seats + 1), num => {
    //     return num + '';
    //   });
    // });
  }

  /*get the number of seats already reserved in the theatre*/
  getSeatReserved() {
    this.bookingObj = null;
    this.sub = this.dataService.getSeatsReserved().subscribe(data => {
      this.bookingData = data;
      const theatreExists = _.find(this.bookingData, n => {
        if (
          n.theatre === this.theatreID &&
          n.movie === this.movieID &&
          n.time === this.time &&
          n.payment.Status === 'success' &&
          n.date === this.dateSelected.toISOString()
        ) {
          return n;
        }
      });
      this.reserved = [];
      if (theatreExists) {
        this.bookingObj = theatreExists;
        this.reserved = theatreExists.seats;
      }
    });
  }
  // clear handler
  clearSelected = function() {
    this.selected = [];
  };
  // click handler
  seatClicked(seatPos: string) {
    if (this.reserved.indexOf(seatPos) === -1) {
      const index = this.selected.indexOf(seatPos);
      if (index !== -1) {
        // seat already selected, remove
        this.selected.splice(index, 1);
      } else {
        // push to selected array only if it is not reserved
        if (this.reserved.indexOf(seatPos) === -1) {
          this.selected.push(seatPos);
        }
      }
    }
  }
  /*buy tickets function*/
  buyTickets() {
    const payment = { type: 'Credit Card', Status: 'success' };
    if (this.selected.length === 0) {
      alert('No seats selected!');
    } else {
      const params = {
        theatre: this.theatreID,
        movie: this.movieID,
        seats: this.reserved.concat(this.selected),
        date: this.date,
        time: this.time,
        payment: payment
      };
      if (this.bookingObj && this.bookingObj.id) {
        this.dataService.updateBookTickets(this.bookingObj.id, params).subscribe(
          success => {
            this.snackBar.open('Movie has been booked successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.dialogRef.close();
          },
          error => {
            this.snackBar.open('Movie booking failed!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
        );
      } else {
        this.dataService.bookTickets(params).subscribe(
          (success: any) => {
            const data = success;
            let userParams;
            const UserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (!_.isArray(UserData.bookings)) {
              UserData.bookings = [];
            }
            UserData.bookings.push(data.id);
            userParams = {
              id: UserData.id,
              name: UserData.name,
              email: UserData.email,
              role: UserData.role,
              bookings: UserData.bookings
            };
            this.snackBar.open('Movie has been booked successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.dialogRef.close();
            this.dataService
              .updateUser(userParams, UserData.id)
              .subscribe(updatesuccess => {
                this.authservice.setUserDetails(userParams);
              });
          },
          error => {
            this.snackBar.open('Movie booking failed!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
        );
      }
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();  }
}

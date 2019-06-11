import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import * as _ from 'lodash';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Promise, all } from 'q';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'Title',
    'Theatre',
    'Date',
    'Time',
    'Seats',
    'PaymentMethod',
    'PaymentStatus'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users;
  currentUser;
  filteredUser;
  bookingInfo;
  tableDataArray = [];
  sub: Subscription;
  sub2: Subscription;
  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUserHistoryDetails();
  }
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*Get all users and filter according to the user id of the logged in user*/
  getUserHistoryDetails() {
    this.dataService.getAllUsers().subscribe(res => {
      this.users = res;
      this.filterUser(this.users);
    });
  }
  filterUser(userData) {
    const UserData = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = _.filter(userData, {
      id: UserData.id
    });
    this.currentUser[0].bookings.forEach((element, index) => {
      this.getAllBookings(element);
    });
  }
  /*get the booking details from the obtained booking id*/
  getAllBookings(id) {
    this.getTableDetails(id).then(
      success => {
        this.tableDataArray.push(success);
        this.dataSource = new MatTableDataSource(this.tableDataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('error --> ', error);
      }
    );
  }

  getTableDetails(bookindId) {
    return Promise((resolve, reject) => {
      this.sub = this.dataService.getBookingDetails(bookindId).subscribe(
        (bookSucc: any) => {
          this.sub2 = this.dataService.getTheatresID(bookSucc.theatre).subscribe(
            (theatreSucc: any) => {
              this.dataService.getMovieDetails(bookSucc.movie).subscribe(
                (movieSucc: any) => {
                  const date = bookSucc.date;
                  const convertedDate = new Date(date);
                  const dateOfBooking = convertedDate.toISOString().substring(0, 10);
                  resolve({
                    movie: movieSucc.title,
                    theatre: theatreSucc.name,
                    Date: dateOfBooking,
                    Time: bookSucc.time,
                    Seats: bookSucc.seats,
                    payment: bookSucc.payment.type,
                    PaymentStatus: bookSucc.payment.Status
                  });
                },
                movieErr => {
                  resolve({
                    booking: bookSucc,
                    theatre: theatreSucc
                  });
                }
              );
            },
            theatreErr => {
              this.dataService.getMovieDetails(bookSucc.movie).subscribe(
                (movieSucc: any) => {
                  resolve({
                    booking: bookSucc,
                    movie: movieSucc
                  });
                },
                movieErr => {
                  resolve({
                    booking: bookSucc
                  });
                }
              );
            }
          );
        },
        bookErr => {}
      );
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';
import { BookingComponent } from './booking.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  const theatre = {
       theatres: [
        {
          'id': 1,
          'name': 'PVR Whitefield',
          'geolocation': '123',
          'address': 'Whitefield, Bangalore',
          'seats': 100,
          'city': 'Bangalore',
          'shows': [
            '10:00',
            '11:00',
            '13:00',
            '21:00'
          ],
          'movies': [
            0
          ]
        },
        {
          'id': 2,
          'name': 'INOX Central Mall',
          'geolocation': '123',
          'address': 'Central Mall, Bangalore',
          'seats': 100,
          'city': 'Bangalore',
          'shows': [
            '10:00',
            '11:00',
            '13:00',
            '21:00'
          ],
          'movies': [
            0
          ]
        },
        {
          'id': 793,
          'name': 'Carnival: Rockline Mall',
          'geolocation': '13.0407501,77.51824910000005',
          // tslint:disable-next-line:max-line-length
          'address': 'No.08, Katha No. 320, Tumkur Main Road, Jalahalli Cross, Chokkasandra, Prashanth Nagar, T. Dasarahalli, Bengaluru, Karnataka 560057, India',
          'seats': 100,
          'city': 'Bengaluru',
          'shows': [
            '10:00',
            '12:55',
            '15:20',
            '16:45',
            '21:40'
          ],
          'movies': [
            450465,
            424783,
            400650,
            572367
          ],
          'theatreListId': 0
        },
        {
          'id': 794,
          'name': 'Cinepolis: Binnypet Mall',
          'geolocation': '12.9659846,77.56194900000003',
          'address': '3rd Floor, Maisur, Magadi Main Rd, Binny Pete, Jagajeevanram Nagar, Bengaluru, Karnataka 560023, India',
          'seats': 100,
          'city': 'Bengaluru',
          'shows': [
            '10:00',
            '12:55',
            '15:20',
            '16:45',
            '21:40'
          ],
          'movies': [
            424783,
            400650,
            575351
          ],
          'theatreListId': 0
        }
      ]
  };
  beforeEach(() => {
    const matDialogRefStub = { close: () => ({}) };
    const matSnackBarStub = { open: () => ({}) };
    const dataServiceStub = {
      getSeatsReserved: () => ({ subscribe: () => ({}) }),
      updateBookTickets: () => ({ subscribe: () => ({}) }),
      bookTickets: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookingComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MatSnackBar, useValue: matSnackBarStub },
        { provide: DataService, useValue: dataServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
  });
  it('clearSelected', () => {
    component.clearSelected();
    expect(component.selected).toEqual('[]');
  });
  // it('can load instance', () => {
  //   expect(component).toBeTruthy();
  // });
  it('movieTitle defaults to: data.movieName', () => {
    const data = {movieName : 'SampleMovie' };
    expect(component.movieTitle).toEqual('SampleMovie');
  });
  it('screen defaults to: data.theatre', () => {
    const data = {theatre : 'PVR Whitefield' };
    expect(component.screen).toEqual('PVR Whitefield');
  });
  it('time defaults to: data.showTime', () => {
    const data = {showTime : '10:30' };
    expect(component.time).toEqual('10:30');
  });
  it('theatreID defaults to: data.theatreID', () => {
     const data = {theatreID : '793' };
    expect(component.theatreID).toEqual(793);
  });
  it('movieID defaults to: data.movieID', () => {
     const data = {movieID : '424783' };
    // expect(component.movieID).toEqual('424783');
  });
  it('dateSelected defaults to: data.dateSelected', () => {
    const data = {dateSelected : '2019-02-11T09:36:48.868Z'};
    expect(component.dateSelected).toEqual('2019-02-11T09:36:48.868Z');
  });
  it('selected defaults to: []', () => {
    expect(component.clearSelected).toHaveBeenCalled();
    expect(component.selected).toEqual(['4']);
  });
  it('reserved defaults to: 2', () => {
    expect(component.reserved).toEqual(['2']);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      // spyOn(component, 'getNumberOfSeats');
      // spyOn(component, 'getSeatReserved');
      component.ngOnInit();
      // expect(component.getNumberOfSeats).toHaveBeenCalled();
      // expect(component.getSeatReserved).toHaveBeenCalled();
    });
  });
  // describe('getSeatReserved', () => {
  //   it('makes expected calls', () => {
  //     const dataServiceStub: DataService = fixture.debugElement.injector.get(DataService);
  //     // spyOn(dataServiceStub, 'getSeatsReserved');
  //     component.getSeatReserved();
  //     expect(dataServiceStub.getSeatsReserved).toHaveBeenCalled();
  //   });
  // });
  // describe('buyTickets', () => {
  //   it('makes expected calls', () => {
  //     const matDialogRefStub = fixture.debugElement.injector.get(
  //       MatDialogRef
  //     );
  //     const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(MatSnackBar);
  //     const dataServiceStub: DataService = fixture.debugElement.injector.get(DataService);
  //     component.buyTickets();
  //     expect(matDialogRefStub.close).toHaveBeenCalled();
  //     expect(matSnackBarStub.open).toHaveBeenCalled();
  //     expect(dataServiceStub.updateBookTickets).toHaveBeenCalled();
  //     expect(dataServiceStub.bookTickets).toHaveBeenCalled();
  //   });
  // });
});

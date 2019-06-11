import { getUpComing } from './../../../movies/store/movies-reducers/reducers';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import * as CanvasJS from '../../../../assets/lib/canvasjs.min.js';
import { DataService } from './../../../shared/services/data.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  imgBaseUrl = environment.movies.MOVIE_IMAGE_URL;
  standardUserCount;
  adminUserCount;
  nowShowingMoviesCount;
  upComingMoviesCount;
  users;
  adminUser;
  standardUser;
  bookings;
  constructor(
    private dataService: DataService,
    private datePipe: DatePipe
  ) { }

  /**
   * Ng OnIt
   */
  ngOnInit() {
    this.dataService.getAllUsers().subscribe(res => {
      this.users = res;
      this.filterUser(this.users);
    });
    this.dataService.getNowPlaying(1).subscribe(res => {
      this.nowShowingMoviesCount = res['total_results'];
    });
    this.dataService.getUpcoming(1).subscribe(res => {
      this.upComingMoviesCount = res['total_results'];
    });
    this.dataService.getTheatresList().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.generateTheatre(res);
      }
    });
    this.dataService.getSeatsReserved().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.generateBookingHistory(res);
      }
    });
    this.dataService.getTopRatedMovies(1).subscribe((res: any) => {
      if (res && res.results.length > 0) {
        this.generateTopRatedMovies(res.results);
      }
    });
    this.dataService.popularMovies(1).subscribe((res: any) => {
      if (res && res.results.length > 0) {
        this.generatePopularMovies(res.results);
      }
    });
  }

  /**
   * Generate Popular Movies
   * @param list - List
   */
  generatePopularMovies(list) {
    const dataPoints: any = [];
    const sliceList: any = _.slice(list, 0, 20);
    sliceList.forEach(element => {
      dataPoints.push({
        y: element.popularity,
        label: element.title,
        imageUrl: this.imgBaseUrl + element.poster_path
      });
    });

    const chart = new CanvasJS.Chart('popularMovies', {
      animationEnabled: true,
      axisX: {
        reversed: true,
        labelMaxWidth: 100,
        labelWrap: false
      },
      axisY: {
        title: 'Popularity'
      },
      data: [{
        type: 'bar',
        toolTipContent: ' <div>' +
          '<div style=\'display:flex;height:80px;\' > ' +
            '<img src=\'\'{imageUrl}\'\' style=\'width:60px; height:40px;\'>' +
            '<div style=\'padding-left:10px;width:200px;white-space:normal;\'><b>Title: </b>{label}<div>' +
          '</div>' +
          '<div>' +
            '<div><b>Popularity:</b> {y}</div>' +
          '</div>' +
        '</div>',
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

/**
 * Generate Top Rated Movies
 * @param list - List
 */
  generateTopRatedMovies(list) {
    const dataPoints: any = [];
    const sliceList: any = _.slice(list, 0, 20);
    sliceList.forEach(element => {
      dataPoints.push({
        y: element.vote_average,
        label: element.title,
        imageUrl: this.imgBaseUrl + element.poster_path
      });
    });

    const chart = new CanvasJS.Chart('topRatedMovies', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: ''
      },
      axisX: {
        labelMaxWidth: 70,
        labelWrap: false,
        labelAngle: 45
      },
      axisY: {
        title: 'Rating averages'
      },
      data: [{
        toolTipContent: ' <div>' +
          '<div style=\'display:flex;height:80px;\' > ' +
            '<img src=\'\'{imageUrl}\'\' style=\'width:60px; height:40px;\'>' +
            '<div style=\'padding-left:10px;width:200px;white-space:normal;\'><b>Title: </b>{label}<div>' +
          '</div>' +
          '<div>' +
            '<div><b>Vote average:</b> {y}</div>' +
          '</div>' +
        '</div>',
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  /**
   * Generate Theatre
   * @param list - List
   */
  generateTheatre(list) {
    const dataPoints: any = [];
    let count = 0;
    list = _.sortBy(list, 'city');
    list.forEach((element, index) => {
      let nxtCity;
      if (list[index + 1]) {
        nxtCity = list[index + 1].city.trim();
      }
      count++;
      if (element.city.trim() !== nxtCity) {
        dataPoints.push({
          name: element.city,
          y: count
        });
        count = 0;
      }
    });
    const maxObj: any = _.maxBy(dataPoints, 'y');
    if (maxObj) {
      maxObj.exploded = true;
    }
    const chart = new CanvasJS.Chart('theatresGraph', {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: ''
      },
      legend: {
        cursor: 'pointer',
        itemclick: explodePie
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '{name}: <strong>{y}</strong>',
        indexLabel: '{name} - {y}',
        dataPoints: dataPoints
      }]
    });
    chart.render();
    function explodePie(e) {
      if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === 'undefined' ||
        !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
      } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
      }
      e.chart.render();
    }
  }

  /**
   * Generate Booking History
   * @param list - list
   */
  generateBookingHistory(list) {
    const dataPoints: any = [];
    let count = 0;
    list.sort((a, b) => {
      const dateB: any = new Date(b.date);
      const dateA: any = new Date(a.date);
      return dateB - dateA;
    });
    list.forEach((element, index) => {
      const date = this.datePipe.transform(element.date, 'dd-MMM-yyyy');
      let nxtDate;
      if (list[index + 1]) {
        nxtDate = this.datePipe.transform(list[index + 1].date, 'dd-MMM-yyyy');
      }
      count++;
      if (date !== nxtDate) {
        dataPoints.push({
          x: new Date(date),
          y: count
        });
        count = 0;
      }
    });
    const chart = new CanvasJS.Chart('bookingHistory', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: ''
      },
      axisX: {
        valueFormatString: 'DD MMM',
        crosshair: {
          enabled: false,
          snapToDataPoint: true
        },
        reversed: true
      },
      axisY: {
        title: 'Number of bookings',
        crosshair: {
          enabled: false
        }
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        dockInsidePlotArea: true,
      },
      data: [{
        type: 'line',
        showInLegend: true,
        name: 'Booking',
        markerType: 'square',
        xValueFormatString: 'DD MMM, YYYY',
        color: '#F08080',
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  /**
   * Filter User
   * @param userData - user data
   */
  filterUser(userData) {
    this.adminUser = _.filter(userData, {
      role: 'Admin'
    });
    this.standardUser = _.filter(userData, {
      role: 'Standard'
    });
  }
}

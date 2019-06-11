import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { DataService } from '../../services/data.service';
import { environment } from '../../../../environments/environment';
import * as authReducer from '../../../core/auth/store/index';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  noMoreMovies: boolean;
  @ViewChild('searchResults') searchResults;
  isLoading;
  movies: any = [];
  previousSearchQuery;
  MOVIES = environment.movies;
  currentPage;
  searchTerm;
  totalPage;
  filterObj;
  bottomProgress;
  preferences;

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    public dataService: DataService,
    private cdr: ChangeDetectorRef,
    private store: Store<authReducer.State>,
  ) { }

  ngOnInit() {
    this.bottomProgress = false;
    this.noMoreMovies = false;
    this.currentPage = 1;
    this.previousSearchQuery = '';
    this.searchTerm = '';
    document.getElementById('searchDialog').onscroll = (eve) => { this.onScroll(eve); };
    this.movies = [];
    this.store.select(authReducer.getUserDetails).subscribe((data: any) => {
      if (data) {
        this.preferences = data.preferences;
      }
      this.getSearchResults(false);
    });
  }

  getSearchResults(isFromScroll) {
    this.isLoading = true;
    if (!isFromScroll) {
      this.movies = [];
      this.currentPage = 1;
    }
    this.previousSearchQuery = this.searchTerm;
    if (this.searchTerm && this.searchTerm.length) {
      this.dataService.searchMovies(this.searchTerm, this.currentPage).subscribe(
        success => {
          this.isLoading = false;
          this.totalPage = success['total_pages'];
          const data = _.cloneDeep(_.orderBy(_.concat(this.movies, success['results']), 'original_language'));
          this.movies = this.langSorting(data);
          this.bottomProgress = false;
        }, error => {
          this.isLoading = false;
          this.bottomProgress = false;
        });
    } else {
      this.dataService.popularMovies(this.currentPage).subscribe(
        success => {
          this.isLoading = false;
          this.totalPage = success['total_pages'];
          const data = _.cloneDeep(_.orderBy(_.concat(this.movies, success['results']), 'original_language'));
          this.movies = this.langSorting(data);
          this.bottomProgress = false;
        }, error => {
          this.isLoading = false;
          this.bottomProgress = false;
        });
    }
  }

  langSorting(data) {
    let array = [];
    if (this.preferences && this.preferences.lang) {
      this.preferences.lang.forEach(element => {
        if (_.findIndex(data, { 'original_language': element }) > -1) {
          array = _.concat(array, this.genreSorting(_.remove(data, { 'original_language': element })));
        }
      });
    }
    const remaingData: any = _.uniq(_.map(data, 'original_language'));
    if (remaingData && remaingData.length) {
      remaingData.forEach(lang => {
        array = _.concat(array,  this.genreSorting(_.remove(data, { 'original_language': lang })));
      });
    }
    return array;
  }

  genreSorting(data) {
    const sorted = {};
    let array = [];
    if (this.preferences && this.preferences.genres) {
      this.preferences.genres.forEach((element, index) => {
        array = _.concat(array, _.remove(data, obj => obj['genre_ids'].indexOf(element) > -1));
      });
    }
    array = _.concat(array, data);
    return array;
  }


  onScroll(eve) {
    const pos = (eve.target.scrollTop || eve.target.scrollTop) +
      eve.target.offsetHeight;
    const max = eve.target.scrollHeight;
    if (Math.round(pos) === max) {
      if (this.totalPage > this.currentPage) {
        this.currentPage++;
        this.bottomProgress = true;
        this.getSearchResults(true);
      }else {
        this.noMoreMovies = true;
      }
    }
  }

  changeFilter(filterData) {
    if (Object.keys(filterData).indexOf('language') > -1) {
      this.filterObj = filterData;
    }
  }

  genresPipe(genresId) {
    return _.join( _.map(_.filter(this.dataService.genresList, (obj: any) => genresId.indexOf(obj.id) > -1), 'name'), ', ');
  }

}

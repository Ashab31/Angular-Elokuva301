import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';
import { ChangeDetectorRef } from '@angular/core';
import { SearchComponent } from './search.component';
import { MoviesFilterPipe } from '../../../shared/pipes/movies-filter.pipe';
import { IsoLanguagePipe } from '../../../shared/pipes/iso-language.pipe';
import { environment } from 'src/environments/environment';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  beforeEach(() => {
    const matDialogRefStub = {};
    const dataServiceStub = {
      searchMovies: () => ({ subscribe: () => ({}) }),
      popularMovies: () => ({ subscribe: () => ({}) })
    };
    const changeDetectorRefStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchComponent, MoviesFilterPipe, IsoLanguagePipe],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: DataService, useValue: dataServiceStub },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub }
      ]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('movies defaults to: []', () => {
    expect(component.movies).toEqual([]);
  });
  it('MOVIES defaults to: environment.movies', () => {
    expect(component.MOVIES).toEqual(environment.movies);
  });
   it('getSearchResults', () => {
     const isFromScroll = true;
    component.getSearchResults(isFromScroll);
  });
   it('getSearchResults when isFromScroll false', () => {
     const isFromScroll = false;
    component.getSearchResults(isFromScroll);
  });
   it('getSearchResults when searchTerm is available', () => {
     const searchTerm = 'Tamil';
     const isFromScroll = true;
     const currentPage = 1;
    component.getSearchResults(isFromScroll);
  });
   it('changeFilter', () => {
     const filterData = {test : 'test1', language : 'english'};
    component.changeFilter(filterData);
  });
  it('changeFilter without language', () => {
     const filterData = {};
    component.changeFilter(filterData);
  });
   it('onScroll', () => {
     const eve = {target : 'test'};
    component.onScroll(eve);
  });
   it('onScroll', () => {
     const eve = {target : 'test'};
     const max = 3;
     const pos = 3;
     const totalPage = 3;
     const currentPage = 1;
    component.onScroll(eve);
  });
});

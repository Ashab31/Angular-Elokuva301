import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() change = new EventEmitter();
  filterForm: FormGroup = this.fb.group({
    language: '',
    genre: '',
    distance: ''
  });


  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  languageGroups: any = [];
  languageGroupOptions: Observable<any>;
  genreGroup: any = [];
  genreGroupOptions: Observable<any>;
  distanceGroup: any = [];
  distanceGroupOptions: Observable<any>;


  ngOnInit() {
    setTimeout(() => {
      this.languageGroups = _.map(this.dataService.languagesList, (item) => {
        item.label = item.english_name;
        return item;
      });
      this.genreGroup = _.map(this.dataService.genresList, (item) => {
        item.label = item.name;
        return item;
      });
      this.languageGroupOptions = this.filterForm.get('language').valueChanges
        .pipe(
        startWith(''),
        map(value => this.filterName(this.languageGroups, value))
        );
      this.genreGroupOptions = this.filterForm.get('genre').valueChanges
        .pipe(
        startWith(''),
        map(value => this.filterName(this.genreGroup, value))
        );
      this.distanceGroupOptions = this.filterForm.get('distance').valueChanges
        .pipe(
        startWith(''),
        map(value => this.filterName(this.distanceGroup, value))
        );
    });
  }

  filterName(opt: any, value: any) {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.label.toLowerCase().indexOf(filterValue) === 0);
  }

  optionSelected(eve) {
    this.change.emit({
      language: _.find(this.languageGroups, { label: this.filterForm.get('language').value }),
      genre: _.find(this.genreGroup, { label: this.filterForm.get('genre').value })
    });
  }

}

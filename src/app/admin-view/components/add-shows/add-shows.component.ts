import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-shows',
  templateUrl: './add-shows.component.html',
  styleUrls: ['./add-shows.component.scss']
})
export class AddShowsComponent implements OnInit {
  @Input() value ;
  @Input() label;
  hours =  this.addTwoDigit(_.range(1, 25));
  minutes = this.addTwoDigit(_.range(0, 61));
  hoursValue;
  minutesValue;

  constructor() { }

  addTwoDigit(array) {
    return _.map(array , (value) => {
      value = value + '';
      return value.length === 1 ? '0' + value : value;
    });
  }

  ngOnInit() {
    if (!_.isArray(this.value)) {
      this.value = [];
    }
  }

  addTimes() {
    if (this.hoursValue && this.minutesValue) {
      const time = `${this.hoursValue}:${this.minutesValue}`;
      if (this.value.indexOf(time) === -1) {
        this.value.push(time);
      }
      this.hoursValue = '';
      this.minutesValue = '';
    }
  }
  trackByFn(index, item) {
    return index;
  }
}

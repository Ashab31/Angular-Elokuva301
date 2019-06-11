import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'theatresSortOrder'
})
export class TheatresSortOrderPipe implements PipeTransform {
  userDetails;
  preferences;

  constructor() {
    this.userDetails = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.preferences = this.userDetails.preferences;
  }

  transform(value: any, args?: any): any {
    const cloneData = _.cloneDeep(value) || [];
    let array: any = [];
    if (this.preferences && this.preferences.theatres && cloneData.length > 1) {
      this.preferences.theatres.forEach(element => {
        array = _.concat(array, _.remove(cloneData, {id: element}));
      });
    } else {
      return value;
    }
    array = _.concat(array, cloneData);
    return array;
  }

}

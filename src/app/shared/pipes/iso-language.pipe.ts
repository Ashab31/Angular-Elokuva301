import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'isoLanguage'
})
export class IsoLanguagePipe implements PipeTransform {

  constructor(
    private dataService: DataService
  ) {}

  transform(value: any, args?: any): any {
    if (value && this.dataService.languagesList) {
      const data: any = _.find(this.dataService.languagesList, { iso_639_1: value });
      return data ? _.toUpper(data.english_name) : _.toUpper(value);
    }
    return _.toUpper(value);
  }

}

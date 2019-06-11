import { Pipe, PipeTransform, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(array: any, args?: any): any {
    let data;
    if (args) {
      if (args.language) {
        data = _.filter(array, { original_language: args.language.iso_639_1 });
      }
      if (args.genre) {
        data = _.filter(array, item => item.genre_ids.indexOf(args.genre.id) > -1);
      }
      if (args.language && args.genre) {
        data = _.filter(array, item => (item.genre_ids.indexOf(args.genre.id) > -1) && item.original_language === args.language.iso_639_1);
      }
      if (data) {
        return data;
      }
    }
    return array;
  }

}

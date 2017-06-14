import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'myGenresToText'
})

export class GenresToTextPipe implements PipeTransform {
  transform(genres: any[]): string {
    return _.map(genres, 'name').join(', ');
  }
}

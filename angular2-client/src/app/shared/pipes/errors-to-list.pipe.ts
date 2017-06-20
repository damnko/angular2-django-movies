import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'myErrorsToList'
})

export class ErrorsToListPipe implements PipeTransform {
  transform(value: {[key: string]: string | boolean}): any[] {
    return _.toArray(value);
  }
}

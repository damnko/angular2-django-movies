import { Observable } from 'rxjs/Rx';
import { UserService } from './../../core/services/user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class AsyncFormValidatorsService {
  timeout: any;
  debounceTime: number = 1000;

  constructor(
    private us: UserService
  ) { }

  usernameUnique(): ValidatorFn {
    return (c: AbstractControl): Observable<{[key: string]: any}> => {
      const username = c.value;
      clearTimeout(this.timeout);
      return Observable.create((observer: any) => {
        this.timeout = setTimeout(() => {
          this.us.usernameIsUnique(username)
            .do((unique) => console.log('called async', unique))
            .map(isUnique => isUnique ? null : { isNotUnique: true })
            .subscribe(
              res => { observer.next(res); observer.complete(); }
            );
        }, this.debounceTime);
      });
    };
  }
}

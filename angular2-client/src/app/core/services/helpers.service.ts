import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class HelpersService {

  constructor(
    private snackBar: MdSnackBar
  ) { }

  showMessage(body: string): void {
    this.snackBar.open(body);
  }
}

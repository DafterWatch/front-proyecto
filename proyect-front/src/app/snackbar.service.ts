import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  show(message: string) {
    this._snackBar.open(
      message,
      'OK',
      {
        duration: this.durationInSeconds * 1000,
      }
    );
  }
}


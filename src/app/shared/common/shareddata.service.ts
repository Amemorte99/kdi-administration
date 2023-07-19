import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareddataService {
  private boolVariable = new BehaviorSubject<boolean>(false);
  currentBoolVariable = this.boolVariable.asObservable();

  private backgroundBoolVariable = new BehaviorSubject<boolean>(false);
  currentBackgroundBoolVariable = this.backgroundBoolVariable.asObservable();


  constructor() {}

  updateBoolVariable(value: boolean) {
    this.boolVariable.next(value);
  }
  updateBackgroundBoolVariable(value: boolean) {
    this.backgroundBoolVariable.next(value);
  }
}

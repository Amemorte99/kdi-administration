import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareddataService {
  private boolVariable = new BehaviorSubject<boolean>(false);
  currentBoolVariable = this.boolVariable.asObservable();

  constructor() {}

  updateBoolVariable(value: boolean) {
    this.boolVariable.next(value);
  }
}

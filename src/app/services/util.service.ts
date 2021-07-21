import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  auxUser: any;

  constructor() {
  }

  setUser(val) {
    this.auxUser = val;
  }

}

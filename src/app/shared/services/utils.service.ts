import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  scrollTop() {
    window.scroll(0, 0);
  }
}

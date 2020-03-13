import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuixLoaderService {
  public loader: any;
  public loaderNumber: number;

  constructor() {
    this.loader = new Subject();
    this.loaderNumber = 0;
  }

  addLoader() {
    this.loaderNumber++;
    this.loader.next(this.loaderNumber);
  }

  subLoader() {
      this.loaderNumber--;
      this.loader.next(this.loaderNumber);
  }
}

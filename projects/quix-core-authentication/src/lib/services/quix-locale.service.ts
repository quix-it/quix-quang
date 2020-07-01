import {Injectable} from '@angular/core';
import {QuixStorageService} from "../storage/quix-storage.service";
import {QuixAuthService} from "./quix-auth.service";

@Injectable({
  providedIn: 'root'
})
export class QuixLocaleService {

  constructor(
    private quixAuthService: QuixAuthService,
    private quiStorageService: QuixStorageService
  ) {
  }

  getLocale() {
    return this.quiStorageService.getLocal('locale')
  }
}

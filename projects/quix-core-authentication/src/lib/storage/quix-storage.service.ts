import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class QuixStorageService {
  constructor(private sessionStorage: SessionStorageService, private localStorage: LocalStorageService) {
  }

  setSession(key: string, value: any): void {
    this.sessionStorage.store(key, JSON.stringify(value));
  }

  getSession(key: string) {
    if (this.sessionStorage.retrieve(key)) {
      return JSON.parse(this.sessionStorage.retrieve(key));
    }
    return null
  }

  getSessionDefault(key: string, defaultValue: string | null) {
    if (JSON.parse(this.sessionStorage.retrieve(key))) {
      return JSON.parse(this.sessionStorage.retrieve(key));
    }
    return defaultValue;
  }

  clearSession(key: string): void {
    this.sessionStorage.clear(key);
  }

  observeSession(key: string) {
    return this.sessionStorage.observe(key);
  }

  setLocal(key: string, value: any): void {
    this.localStorage.store(key, JSON.stringify(value));
  }

  getLocal(key: string) {
    if (this.localStorage.retrieve(key)) {
      return JSON.parse(this.localStorage.retrieve(key));
    }
    return null
  }

  getLocalDefault(key: string, defaultValue: string | null) {
    if (JSON.parse(this.localStorage.retrieve(key))) {
      return JSON.parse(this.localStorage.retrieve(key));
    }
    return defaultValue;
  }

  clearLocal(key: string): void {
    this.localStorage.clear(key);
  }

  observeLocal(key: string) {
    return this.localStorage.observe(key);
  }
}

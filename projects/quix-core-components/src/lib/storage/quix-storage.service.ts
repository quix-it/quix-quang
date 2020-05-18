import {EventEmitter, Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable()
export class QuixStorageService {
  constructor(private sessionStorage: SessionStorageService, private localStorage: LocalStorageService) {
  }

  setSession(key: string, value: any): void {
    this.sessionStorage.store(key, JSON.stringify(value));
  }

  getSession(key: string): string {
    return JSON.parse(this.sessionStorage.retrieve(key));
  }

  getSessionDefault(key: string, defaultValue: string): string {
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

  getLocal(key: string): string {
    return JSON.parse(this.localStorage.retrieve(key));
  }

  getLocalDefault(key: string, defaultValue: string): string {
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

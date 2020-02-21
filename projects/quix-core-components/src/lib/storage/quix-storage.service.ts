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

  clearLocal(key: string): void {
    this.localStorage.clear(key);
  }

  observeLocal(key: string) {
    return this.localStorage.observe(key);
  }
}

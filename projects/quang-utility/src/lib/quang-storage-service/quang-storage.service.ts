import { Injectable } from '@angular/core'
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'
import { Observable } from 'rxjs'

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for web storage management
 */
export class QuangStorageService {
  /**
   * constructor
   * @param sessionStorage session storage access
   * @param localStorage local storage access
   */
  constructor (
    private readonly sessionStorage: SessionStorageService,
    private readonly localStorage: LocalStorageService) {
  }

  /**
   * saves in the sessionStorage the past data identified by the passed key
   * @param key
   * @param value
   */
  setSession (key: string, value: any): void {
    this.sessionStorage.store(key, JSON.stringify(value))
  }

  /**
   * retrieves the data saved with the passed key from the sessionStorage
   * @param key
   */
  getSession (key: string): any {
    return JSON.parse(this.sessionStorage.retrieve(key))
  }

  /**
   * retrieves the data saved with the passed key from the sessionStorage,
   * if it finds nothing, it returns the default value set
   * @param key
   * @param defaultValue
   */
  getSessionDefault (key: string, defaultValue: string): string {
    try {
      return JSON.parse(this.sessionStorage.retrieve(key)) ?? defaultValue
    } catch (e) {
      return defaultValue
    }
  }

  /**
   * deletes the data saved with the passed key from the sessionStorage
   * @param key
   */
  clearSession (key: string): void {
    this.sessionStorage.clear(key)
  }

  /**
   * returns an observable that it issues whenever the value of the passed key changes within the sessionStoare
   * @param key
   */
  observeSession (key: string): Observable<any> {
    return this.sessionStorage.observe(key)
  }

  /**
   * saves in the localStorage the past data identified by the passed key
   * @param key
   * @param value
   */
  setLocal (key: string, value: any): void {
    this.localStorage.store(key, JSON.stringify(value))
  }

  /**
   * retrieves the data saved with the passed key from the localStorage
   * @param key
   */
  getLocal (key: string): any {
    return JSON.parse(this.localStorage.retrieve(key))
  }

  /**
   * retrieves the data saved with the passed key from the localStorage
   * if it finds nothing, it returns the default value set
   * @param key
   * @param defaultValue
   */
  getLocalDefault (key: string, defaultValue: string): string {
    try {
      return JSON.parse(this.localStorage.retrieve(key)) ?? defaultValue
    } catch (e) {
      return defaultValue
    }
  }

  /**
   * deletes the data saved with the passed key from the localStorage
   * @param key
   */
  clearLocal (key: string): void {
    this.localStorage.clear(key)
  }

  /**
   * returns an observable that emits whenever the value of the passed key changes within the localStoare
   * @param key
   */
  observeLocal (key: string): Observable<any> {
    return this.localStorage.observe(key)
  }
}

import { Injectable } from '@angular/core'

import { Observable, Subject } from 'rxjs'

/**
 * general declaration for global library
 */
declare let EventBus: any

/**
 * utility for event bus management
 */
export interface QuangBusEventOptions {
  /**
   * Max reconnect attempts
   */
  vertxbus_reconnect_attempts_max: number
  /**
   * Initial delay (in ms) before first reconnect attempt
   */
  vertxbus_reconnect_delay_min: number
  /**
   *  Max delay (in ms) between reconnect attempts
   */
  vertxbus_reconnect_delay_max: number
  /**
   * Exponential backoff factor
   */
  vertxbus_reconnect_exponent: number
  /**
   * Randomization factor between 0 and 1
   */
  vertxbus_randomization_factor: number
}

/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
export class QuangEventBusService {
  /**
   * the subject that outputs the returned values
   */
  bus: Subject<any> = new Subject<any>()
  /**
   * event bus wrapper
   */
  eb: any
  /**
   * event buss server address
   */
  address: string = ''
  /**
   * event bus headers
   */
  headers?: object
  /**
   * event bus configuration
   */
  options: QuangBusEventOptions = {
    vertxbus_reconnect_attempts_max: 5,
    vertxbus_reconnect_delay_min: 1000,
    vertxbus_reconnect_delay_max: 5000,
    vertxbus_reconnect_exponent: 2,
    vertxbus_randomization_factor: 0.5
  }

  /**
   * open the event buss socket
   * @param url
   * @param address
   * @param headers
   * @param options
   */
  openSocket(url: string, address: string, headers?: object, options?: QuangBusEventOptions): Observable<any> {
    this.headers = headers
    this.address = address
    this.eb = new EventBus(url, options ?? this.options)
    this.eb.enableReconnect(true)
    this.onOpen()
    this.onReconnect()
    return this.bus
  }

  /**
   * send message on event bus socket
   * @param message
   */
  sendMessage(message: string): void {
    this.eb.send(this.address, message, (e, m) => {
      if (e) {
        console.error(e)
      }
    })
  }

  /**
   * close the event bus socket
   */
  closeSocket(): void {
    this.bus.complete()
    if (this.eb) {
      try {
        this.eb.unregisterHandler(this.address, this.headers)
      } catch (e) {
      } finally {
        this.eb.close()
      }
    }
  }

  /**
   * when the socket is opened it sends a message in the observable indicating that the socket has been opened
   * and listens to the messages
   * @private
   */
  private onOpen(): void {
    this.eb.onopen = () => {
      this.bus.next('socketInit')
      this.onMessage()
    }
  }

  /**
   * when a reception event is issued, the message checks if it is an error,
   * if it is not, it tries to transform the json of the response and does the next of the connected observable,
   * if it is not a json it does the next of the response as it is
   * @private
   */
  private onMessage(): void {
    this.eb.registerHandler(this.address, (e, m) => {
      if (e) {
        this.onError(e)
      } else {
        try {
          this.bus.next(JSON.parse(m.body))
        } catch (e) {
          this.bus.next(m.body)
        }
      }
    })
  }

  /**
   * handling of the error event
   * @param error
   * @private
   */
  private onError(error: Error): void {
    this.bus.error(error)
    console.error(error)
  }

  /**
   * to do if necessary
   * @private
   */
  private onReconnect(): void {}
}

import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

declare var EventBus: any;

export interface QuixBusEventOptions {
  vertxbus_reconnect_attempts_max: number,
  vertxbus_reconnect_delay_min: number,
  vertxbus_reconnect_delay_max: number,
  vertxbus_reconnect_exponent: number,
  vertxbus_randomization_factor: number
}

@Injectable({
  providedIn: 'root'
})
export class QuixEventBusService {
  bus: Subject<any>
  eb: any
  address: string
  headers: object
  options: QuixBusEventOptions = {
    vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
    vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
    vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
    vertxbus_reconnect_exponent: 2, // Exponential backoff factor
    vertxbus_randomization_factor: 0.5 // Randomization factor between 0 and 1
  }

  constructor() {
    this.bus = new Subject<any>()
  }

  /**
   * open the event buss socket
   * @param url
   * @param address
   * @param headers
   * @param options
   */
  openSocket(url: string, address: string, headers?: object, options?: QuixBusEventOptions) {
    this.headers = headers
    this.address = address
    this.eb = new EventBus(url, options ? options : this.options)
    this.eb.enableReconnect(true)
    this.onOpen()
    this.onReconnect()
    return this.bus
  }

  /**
   * send message on event bus socket
   * @param message
   */
  sendMessage(message: string) {
    this.eb.send(this.address, message, (e, m) => {
      if (e) {
        console.error(e)
      }
    })
  }

  /**
   * close the event bus socket
   */
  closeSocket() {
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

  private onOpen() {
    this.eb.onopen = () => {
      console.log('Socket opened')
      this.bus.next('socketInit')
      this.onMessage()
    }
  }

  private onMessage() {
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

  private onError(error: Error) {
    this.bus.error(error)
    console.error(error)
  }

  private onReconnect() {
  }
}

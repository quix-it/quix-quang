import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { EventSourcePolyfill } from 'event-source-polyfill'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root'
})
/**
 * utility for event source management
 */
export class QuixEventSourceService {
  /**
   * event source wrapper
   * @private
   */
  private evs: EventSource
  /**
   * the subject that outputs the returned values
   */
  events: Subject<any> = new Subject()

  /**
   * method to initialize and observe the eventSource message
   * @param baseUrl
   * @param url
   * @param auth
   * @param param
   * @param heartbeatTimeout
   */
  openEventSource (baseUrl: string, url: string, auth: boolean, param?: string, heartbeatTimeout?: number): Subject<any> {
    this.events = new Subject()
    if (auth) {
      this.evs = new EventSourcePolyfill(`${baseUrl}${url}/${param}`, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        heartbeatTimeout: heartbeatTimeout ? heartbeatTimeout : 45 * 1000
      })
    } else {
      this.evs = new EventSourcePolyfill(`${baseUrl}${url}/${param}`,
        {
          heartbeatTimeout: heartbeatTimeout ? heartbeatTimeout : 45 * 1000
        })
    }
    this.onOpen()
    this.onEvent()
    this.onError()
    return this.events
  }

  /**
   * management of the channel opening event,
   * logs that the anal has been opened and sends in the observable that the channel has been opened
   * @private
   */
  private onOpen (): void {
    this.evs.onopen = () => {
      this.events.next('eventSourceInit')
      console.log('EventSource link opened')
    }
  }

  /**
   * When an event is received from the channel
   * it tries to transform the json into an object and to emit it in the observable
   * if it is not possible emit the response as it came from the channel
   * @private
   */
  private onEvent (): void {
    this.evs.onmessage = (m) => {
      try {
        this.events.next(JSON.parse(m.data))
      } catch (e) {
        this.events.next(m.data)
      }
    }
  }

  /**
   * Channel error handling sends the observable into error
   * @private
   */
  private onError (): void {
    this.evs.onerror = (e) => {
      this.events.error(e)
      console.error(e)
    }
  }

  /**
   * close the event source channel
   */
  closeEventSource (): void {
    this.events.complete()
    this.evs.close()
  }
}

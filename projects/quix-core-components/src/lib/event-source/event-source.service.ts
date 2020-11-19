import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {EventSourcePolyfill} from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class QuixEventSourceService {
  private evs: EventSource;
  events: Subject<any>;

  constructor(private http: HttpClient) {
  }

  /**
   * method to initialize and observe the eventSource objectioic capacitor ruun
   * @param baseUrl
   * @param url
   * @param auth
   * @param param
   * @param heartbeatTimeout
   */
  observeEvents(baseUrl: string, url: string, auth: boolean, param?: string, heartbeatTimeout?: number): Subject<any> {
    this.events = new Subject();
    if (auth) {
      this.evs = new EventSourcePolyfill(`${baseUrl}${url}/${param}`, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
        },
        heartbeatTimeout: heartbeatTimeout ? heartbeatTimeout : 45 * 1000
      });
    } else {
      this.evs = new EventSourcePolyfill(`${baseUrl}${url}/${param}`,
        {
          heartbeatTimeout: heartbeatTimeout ? heartbeatTimeout : 45 * 1000
        });
    }
    this.onOpen();
    this.onEvent();
    this.onError();
    return this.events;
  }

  private onOpen() {
    this.evs.onopen = () => console.log('EventSource link opened');
  }

  private onEvent() {
    this.evs.onmessage = (m) => {
      this.events.next(JSON.parse(m.data));
    };
  }

  private onError() {
    this.evs.onerror = (e) => {
      this.events.error(e);
    };
  }

  stopObserveEvents() {
    this.events.complete();
    this.evs.close();
  }
}

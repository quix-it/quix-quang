import { Injectable, Optional } from '@angular/core'
import { QuangMapConfig } from '../quang-map.config'
/**
 * service decorator
 */
@Injectable({
  providedIn: 'root',
})
/**
 * utility for google map management
 */
export class QuixGoogleMapService {
  /**
   * google map key
   */
  public key: string
  /**
   * window access
   */
  _window = (): any => window

  /**
   * constructor
   * @param config module config
   */
  constructor (
    @Optional() config: QuangMapConfig
  ) {
    if (config.googleKey) {
      this.key = config.googleKey
    } else if (this._window().quixConfig.googleKey) {
      this.key = this._window().quixConfig.googleKey
    } else {
      alert('[QUANG MAP CONFIG] You need a googleKey for the map')
    }
  }

  /**
   * adds the script to load the Google map library
   */
  addMapScript () {
    const s = window.document.createElement('script')
    s.id = 'google-map-script'
    s.type = 'text/javascript'
    s.src = `https://maps.googleapis.com/maps/api/js?key=${this.key}`
    window.document.body.appendChild(s)
  }
}

import {Injectable, Optional} from '@angular/core';
import { QuangMapConfig } from '../quang-map.config'



@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  public key: string;

  constructor(@Optional() config: QuangMapConfig) {
    if (config.googleKey) {
      this.key = config.googleKey;
    } else {
      alert('You need a googleKey for the map');
    }
  }

  addMapScript() {
    const s = window.document.createElement('script');
    s.id = 'google-map-script';
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.key;
    window.document.body.appendChild(s);
  }
}

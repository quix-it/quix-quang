import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GoogleMarkerModel} from './google-marker.model';
import {GoogleMapService} from './google-map.service';

declare var google: any;

@Component({
  selector: 'quix-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  public MARKER_LIST: Array<GoogleMarkerModel> = [];
  public googleMarkers: Array<any> = [];
  @ViewChild('map', {static: false}) mapDiv: ElementRef<HTMLDivElement>;
    /**
   * Html id of input
   */
  @Input() id: string = '';
  @Input() height: string;
  @Input() defaultZoom: number;
  @Input() mapType: string;
  @Input() defaultCenter: Array<number>;
  @Output() markerClick = new EventEmitter<any>();
  @Input() enableClick: boolean;
  @Input() customIcons: boolean;
  @Input() set markerList(value: Array<GoogleMarkerModel>) {
    this.MARKER_LIST = value;
    if (this.map) {
      this.createMarkers();
    }
  }

  get markerList(): Array<GoogleMarkerModel> {
    return this.MARKER_LIST;
  }

  public map: any;
  public center: {};

  constructor(private googleMapService: GoogleMapService) {
  }

  ngOnInit() {
    if (!this.map) {
      this.renderMap();
    }
  }

  renderMap() {
    if (!window.document.getElementById('google-map-script')) {
      this.googleMapService.addMapScript();
      this.renderMap();
    } else {
      try {
        this.loadMap();
        this.createMarkers();
      } catch (e) {
        const ref = this;
        setTimeout(() => {
          ref.renderMap();
        }, 100);
      }
    }
  }

  loadMap() {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: {lat: this.defaultCenter[0], lng: this.defaultCenter[1]},
      zoom: this.defaultZoom,
      mapTypeId: this.mapType
    });
  }

  createMarkers() {
    this.removeMarkers();
    this.MARKER_LIST.forEach((markerModel) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerModel.lat, markerModel.long),
        map: this.map,
        clickable: false
      });
      marker.setValues({
        data: markerModel
      });
      if (this.customIcons) {
        marker.setIcon(markerModel.customIcon);
      }
      if (this.enableClick) {
        marker.setClickable(true);
        marker.addListener('click', () => {
          this.markerClick.emit(marker);
        });
      }
      this.googleMarkers.push(marker);
    });
  }

  removeMarkers() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.googleMarkers.length; i++) {
      this.googleMarkers[i].setMap(null);
    }
    this.googleMarkers.length = 0;
  }
}

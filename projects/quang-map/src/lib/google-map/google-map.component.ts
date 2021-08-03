import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { QuixGoogleMapService } from './google-map.service'
import { GoogleMarker } from './google-marker.model'
import { of, timer } from 'rxjs'
import { delay, delayWhen, map, retryWhen } from 'rxjs/operators'

/**
 * global declaration for google async library
 */
declare var google: any

@Component({
  selector: 'quix-google-map',
  templateUrl: './google-map.component.html',
  styles: ['']
})
/**
 * google map component
 */
export class GoogleMapComponent implements OnChanges {
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * index within the navigation flow by tab
   */
  @Input() tabIndex: number = 0
  /**
   * the label that describes the accessibility component
   */
  @Input() ariaLabel: string = ''
  /**
   * the height of the map
   */
  @Input() height: string = '50vh'
  /**
   * the initial zoom of the map
   */
  @Input() defaultZoom: number = 0
  /**
   * The type of map to display
   */
  @Input() mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  /**
   * the default center of the map
   */
  @Input() defaultCenter: Array<number> = [0, 0]
  /**
   * enable the click on the markers
   */
  @Input() enableClick: boolean = false
  /**
   * enable custom marker icons
   */
  @Input() customIcons: boolean = false
  /**
   * the list of markers to be drawn on the map
   */
  @Input() markers: Array<GoogleMarker> = []
  /**
   * event triggered by clicking on a marker
   */
  @Output() markerClick = new EventEmitter<any>()
  /**
   * The html element in which the map will be created
   */
  @ViewChild('map', { static: false }) mapDiv: ElementRef<HTMLDivElement> | null = null
  /**
   * function to access the window
   */
  _window = (): any => window
  /**
   * the variable that contains the map
   */
  _map: any
  /**
   * temporary marker list
   */
  _markers: any[] = []

  /**
   * constructor
   * @param googleMapService
   */
  constructor (
    private readonly googleMapService: QuixGoogleMapService) {
    this.renderMap()
  }

  /**
   * when the marker list is changed, it deletes the existing ones and creates the new ones
   * when the center changes it updates the center of the map,
   * when the map type changes it builds a new map
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes.markers?.currentValue) {
      of('').pipe(
        map(() => {
          if (!this._window().google) {
            throw ''
          }
          return ''
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(val => timer(100))
        ))
      ).subscribe(() => {
        this.removeMarkers()
        this.createMarkers()
      })
    }
    if (changes.mapType?.currentValue) {
      if (this._window().google) {
        this.loadMap()
      }
    }
    if (changes.defaultCenter?.currentValue) {
      if (this._window().google) {
        this._map.setCenter({ lat: this.defaultCenter[0], lng: this.defaultCenter[1] })
      }
    }
  }

  /**
   * Check if there is already the script that loads the Google map library,
   * if it is not active the service to add the script otherwise try to create to the map
   */
  renderMap (): void {
    if (!window.document.getElementById('google-map-script')) {
      this.googleMapService.addMapScript()
      this.renderMap()
    } else {
      try {
        this.loadMap()
      } catch (e) {
        of('').pipe(
          delay(100)
        ).subscribe(() => this.renderMap())
      }
    }
  }

  /**
   * Create the map
   */
  loadMap (): void {
    this._map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: { lat: this.defaultCenter[0], lng: this.defaultCenter[1] },
      zoom: this.defaultZoom,
      mapTypeId: this.mapType
    })
  }

  /**
   * Create markers starting from the marker list if needed add a listener on the click event.
   */
  createMarkers (): void {
    this.markers.forEach((markerModel: GoogleMarker) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerModel.lat, markerModel.long),
        map: this._map,
        clickable: false
      })
      marker.setValues({
        data: markerModel
      })
      if (this.customIcons) {
        marker.setIcon(markerModel.customIcon)
      }
      if (this.enableClick) {
        marker.setClickable(true)
        marker.addListener('click', () => {
          this.markerClick.emit(marker)
        })
      }
      this._markers.push(marker)
    })
  }

  /**
   * removes the markers from the map
   */
  removeMarkers (): void {
    this._markers.forEach((m, i) => {
      this._markers[i].setMap(null)
    })
    this._markers = []
  }
}

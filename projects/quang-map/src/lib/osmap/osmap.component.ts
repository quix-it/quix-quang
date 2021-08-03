import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import { Tile } from 'ol/layer'
import { OSM } from 'ol/source'
import * as olProj from 'ol/proj'

@Component({
  selector: 'quix-osmap',
  templateUrl: './osmap.component.html',
  styles: ['']
})
/**
 * open street map component
 */
export class OpenStreetMapComponent implements OnChanges, AfterViewInit {
  /**
   * the height of the map
   */
  @Input() height: string = ''
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
   * Initial zoom level
   */
  @Input() defaultZoom: number = 0
  /**
   * Minimum zoom level
   */
  @Input() minZoom: number = 0
  /**
   * Maximum zoom level
   */
  @Input() maxZoom: number = 0
  /**
   * Center of the starting map
   */
  @Input() defaultCenter: number[] = []
  /**
   * Enable the click on the map
   */
  @Input() enableClick: boolean = false
  /**
   * the list of markers to be drawn on the map
   */
  // @Input() markers: Array<OsmapMarker> = []
  /**
   * Click event on the marker
   */
  // @Output() markerClick: EventEmitter<any> = new EventEmitter<any>()
  /**
   * The html element in which the map will be created
   */
  @ViewChild('map', { static: false }) mapDiv: ElementRef<HTMLDivElement> | null = null
  /**
   * the map variable
   */
  _map: Map
  _tile: Tile<any> = new Tile({
    source: new OSM()
  })

  /**
   * Create the map
   */
  ngAfterViewInit (): void {
    this.createMap()
  }

  /**
   * Create the map and add the listener for the events
   */
  createMap (): void {
    this._map = new Map({
      target: this.id,
      layers: [this._tile],
      view: new View({
        center: olProj.fromLonLat(this.defaultCenter),
        zoom: this.defaultZoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      })
    })
  }

  /**
   * When the center of defualt changes it generates a new map
   * When the default zoom changes it generates a new map
   * @param changes
   */
  ngOnChanges (changes: SimpleChanges) {
    if (changes.defaultCenter?.currentValue) {
      this.createMap()
    }
    if (changes.defaultZoom?.currentValue) {
      this.createMap()
    }
  }
}

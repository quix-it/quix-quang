import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OsmapModel} from './osmap.model';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile, Vector} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import {OSM} from 'ol/source';


@Component({
  selector: 'quix-osmap',
  templateUrl: './osmap.component.html',
  styleUrls: ['./osmap.component.scss']
})
export class OSMapComponent implements OnInit, AfterViewInit {
  private MARKER_LIST: Array<OsmapModel> = [];
  public map: Map;
  public tile: Tile;
  public markerLayer: Vector;
  public markers: VectorSource;
  private center: Array<number>;
  @Input() height: string;
  @Input() id: string;
  @Input() defaultZoom: number;
  @Input() minZoom: number;
  @Input() maxZoom: number;
  @Input() defaultCenter: Array<number>;
  @Output() markerClick = new EventEmitter<any>();
  @Input() enableClick = Boolean;

  @Input() set markerList(value: Array<OsmapModel>) {
    if (value) {
      this.MARKER_LIST = value;
    }
    if (this.markerLayer) {
      this.map.removeLayer(this.markerLayer);
    }
    if (this.map) {
      this.createMarker();
      this.createMarkerLayer();
    }
  }

  get markerList(): Array<OsmapModel> {
    return this.MARKER_LIST;
  }

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.createTile();
    this.findCenter();
    this.createMap();
    if (this.MARKER_LIST) {
      this.createMarker();
      this.createMarkerLayer();
    }
  }

  createTile() {
    this.tile = new Tile({
      source: new OSM()
    });
  }

  createIcon(marker: OsmapModel): Style {
    return new Style({
      image: new Icon({
        anchor: marker.size,
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: marker.src
      })
    });
  }

  createMarker() {
    const list = [];
    this.MARKER_LIST.forEach((marker) => {
      const iconFeature = new Feature({
        ...marker,
        geometry: new Point(fromLonLat([marker.long, marker.lat]))
      });
      iconFeature.setStyle(this.createIcon(marker));
      list.push(iconFeature);
    });
    this.markers = new VectorSource({
      features: list
    });
  }

  createMap() {
    this.map = new Map({
      target: this.id,
      layers: [this.tile],
      view: new View({
        center: this.center,
        zoom: this.defaultZoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      })
    });
    if (this.enableClick) {
      this.map.on('click', (evt) => {
          const feature = evt.map.forEachFeatureAtPixel(evt.pixel,
            (feature) => {
              return feature;
            });
          if (feature) {
            this.markerClick.emit(feature.values_);
          }
        },
        {hitTolerance: 33}
      );
    }
  }

  createMarkerLayer() {
    this.markerLayer = new Vector({
      source: this.markers
    });
    this.map.addLayer(this.markerLayer);
  }

  findCenter() {
    if (this.MARKER_LIST.length) {
      let lat = 0;
      let long = 0;
      this.MARKER_LIST.forEach((marker) => {
        long += marker.long;
        lat += marker.lat;
      });
      this.center = fromLonLat([long / this.MARKER_LIST.length, lat / this.MARKER_LIST.length]);
    } else {
      this.center = this.defaultCenter;
    }
  }
}

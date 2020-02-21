export class GoogleMarkerModel {
  public lat: number;
  public long: number;
  public data?: {};
  customIcon?: string;

  constructor(lat: number, long: number, data?: {}, customIcon?: string) {
    this.lat = lat;
    this.long = long;
    this.data = data;
    this.customIcon = customIcon;
  }
}

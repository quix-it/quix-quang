export class Osmap {
  public long: number;
  public lat: number;
  public src?: string;
  public size?: Array<number>;
  public data?: {};

  constructor(lat: number, long: number, src?: string, color?: string, size?: Array<number>, data?: {}) {
    this.long = long;
    this.lat = lat;
    this.src = src;
    if (size) {
      this.size = size;
    } else {
      this.size = [0.5, 25];
    }
    this.data = data;
  }
}

export class OsmapMarker {
  constructor (
    public long: number,
    public lat: number,
    public size: Array<number> = [0.5, 25],
    public src?: string,
    public data?: {},
  ) {}
}

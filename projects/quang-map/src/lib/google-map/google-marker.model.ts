export class GoogleMarker {
  constructor (
    public lat: number,
    public long: number,
    public data?: {},
    public customIcon?: string
  ) {}
}

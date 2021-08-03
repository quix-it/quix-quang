export class GoogleMarker {
  constructor (
    /**
     * latitude
     */
    public lat: number,
    /**
     * longitude
     */
    public long: number,
    /**
     * marker data
     */
    public data?: {},
    /**
     * icon image url
     */
    public customIcon?: string
  ) {}
}

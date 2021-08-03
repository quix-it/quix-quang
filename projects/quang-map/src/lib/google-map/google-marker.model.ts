/**
 * google marker
 */
export class GoogleMarker {
  /**
   * google marker constructor
   * @param lat
   * @param long
   * @param data
   * @param customIcon
   */
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

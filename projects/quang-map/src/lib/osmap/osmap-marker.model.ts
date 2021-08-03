/**
 * pen street map marker
 */
export class OsmapMarker {
  /**
   * open street map constructor
   * @param long
   * @param lat
   * @param size
   * @param src
   * @param data
   */
  constructor (
    /**
     * longitude
     */
    public long: number,
    /**
     * latitude
     */
    public lat: number,
    /**
     * size
     */
    public size: Array<number> = [0.5, 25],
    /**
     * image source
     */
    public src?: string,
    /**
     * marker data
     */
    public data?: {},
  ) {}
}

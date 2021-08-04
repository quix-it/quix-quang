/**
 * pen street map marker
 */
export class OsmapMarker {
  /**
   * open street map constructor
   * @param long define marker longitude
   * @param lat define marker latitude
   * @param size define marker size
   * @param src define marker image source
   * @param data define marker data
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

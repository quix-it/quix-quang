/**
 * google marker
 */
export class GoogleMarker {
  /**
   * google marker constructor
   * @param lat define marker latitude
   * @param long define marker longitude
   * @param data define marker data
   * @param customIcon define marker icon
   */
  constructor(
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
    public data?: Record<string, unknown>,
    /**
     * icon image url
     */
    public customIcon?: string
  ) {}
}

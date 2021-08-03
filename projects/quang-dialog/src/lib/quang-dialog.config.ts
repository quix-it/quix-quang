export class QuangDialogConfig {
  /**
   * module config
   * @param production
   * @param noErrorUrls
   * @param noLoaderUrls
   * @param noLoaderMethods
   */
  constructor (
    /**
     * define release environment
     */
    public production: boolean,
    /**
     * defines the list of errors not to be caught
     */
    public noErrorUrls?: { url: string, error: number }[],
    /**
     * defines the list of url not to be caught from loader
     */
    public noLoaderUrls?: string[],
    /**
     * defines the list of methods not to be caught
     */
    public noLoaderMethods?: string[]
  ) {}
}

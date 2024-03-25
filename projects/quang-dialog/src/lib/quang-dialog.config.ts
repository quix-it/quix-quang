/**
 * module config
 */
export class QuangDialogConfig {
  /**
   * module config constructor
   * @param production define production environment
   * @param noErrorUrls define no error url list
   * @param noLoaderUrls define no loader url list
   * @param noLoaderMethods define no loader url method
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

import {QuixPicture} from "../picture/picture.model";

/**
 * carousel item
 */
export class QuixCarousel {
  /**
   *  constructor
   * @param src define slide url image
   * @param responsiveList define slide responsive list image
   * @param alt define slide alt image
   * @param title define slide title
   * @param subTitle define slide subtitle
   */
  constructor(
    /**
     * image url
     */
    public src: string,
    /**
     * quix picture list for responsive design
     */
    public responsiveList: QuixPicture[],
    /**
     * alt text for the image
     */
    public alt: string,
    /**
     * if necessary the title of the slide
     */
    public title?: string,
    /**
     * if necessary the sub title of the slide
     */
    public subTitle?: string
  ) {
  }
}

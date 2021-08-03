import {QuixPicture} from "../picture/picture.model";

export class QuixCarousel {
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

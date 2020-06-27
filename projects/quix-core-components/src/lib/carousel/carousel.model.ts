import {QuixPicture} from "../picture/picture.model";

export class QuixCarousel {
  constructor(
    public src: string,
    public responsiveList: QuixPicture[],
    public alt: string,
    public title?: string,
    public subTitle?: string
  ) {
  }
}

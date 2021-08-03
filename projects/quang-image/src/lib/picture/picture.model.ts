/**
 * picture
 */
export class QuixPicture {
  /**
   * the minimum width for which you see this image
   */
  public minWidth: string
  /**
   * image url
   */
  public src: string

  /**
   * picture constructor
   * @param minWidth
   * @param src
   */
  constructor (minWidth: 0 | 415 | 768 | 992 | 1200, src: string) {
    this.minWidth = `(min-width:${minWidth}px)`
    this.src = src
  }
}

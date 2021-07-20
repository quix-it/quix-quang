export class QuixPicture {
  public minWidth: string
  public src: string

  constructor (minWidth: 0 | 415 | 768 | 992 | 1200, src: string) {
    this.minWidth = `(min-width:${minWidth}px)`
    this.src = src
  }
}

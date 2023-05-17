/**
 * picture
 */
export class QuangPicture {
  /**
   * @param defaultSrc
   * @param xs <576px
   * @param sm ≥576px
   * @param md ≥768px
   * @param lg ≥992px
   * @param xl ≥1200px
   * @param xxl ≥1400px
   */
  constructor(
    public defaultSrc: string,
    public xs?: string,
    public sm?: string,
    public md?: string,
    public lg?: string,
    public xl?: string,
    public xxl?: string
  ) {}
}

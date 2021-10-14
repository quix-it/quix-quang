/**
 *
 */
export class ChartTree {
  /**
   *
   * @param name
   * @param collapsed
   * @param value
   * @param children
   */
  constructor (
    /**
     *
     */
    public name: string,
    /**
     *
     */
    public collapsed?: boolean,
    /**
     *
     */
    public children?: ChartTree[],
    /**
     *
     */
    public value?: number
  ) {}
}

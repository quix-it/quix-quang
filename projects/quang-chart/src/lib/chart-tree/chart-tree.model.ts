/**
 * Chart tree model
 */
export class ChartTree {
  /**
   *
   * @param name node name
   * @param collapsed initial state of node
   * @param value node value
   * @param children sub node list
   */
  constructor (
    /**
     * Chart tree node name
     */
    public name: string,
    /**
     * Chart tree node state
     */
    public collapsed?: boolean,
    /**
     * Chart tree node sub children node
     */
    public children?: ChartTree[],
    /**
     * Chart tree node value
     */
    public value?: number
  ) {}
}

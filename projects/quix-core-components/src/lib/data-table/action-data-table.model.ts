export class ActionDataTableModel {
  public actionName: string;
  public icon: Array<string>;
  public condition?: (element: any) => {};

  constructor(actionName: string, icon: Array<string>, condition?: (element: any) => {}) {
    this.actionName = actionName;
    this.icon = icon;
    if (!condition) {
      this.condition = (element: any) => {
        return false;
      };
    } else {
      this.condition = condition;
    }
  }
}

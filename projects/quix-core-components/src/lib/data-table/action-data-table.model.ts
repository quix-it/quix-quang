export class ActionDataTableModel {
  public actionLabel: string;
  public actionName: string;
  public icon: Array<string>;
  public condition?: (element: any) => {};

  constructor(actionLabel: string, actionName: string, icon: Array<string>, condition?: (element: any) => {}) {
    this.actionLabel = actionLabel;
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

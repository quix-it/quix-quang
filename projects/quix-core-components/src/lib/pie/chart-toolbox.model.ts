export class ChartToolboxModel {
  public title: string;
  public show: boolean;
  public icon: string;
  public onclick: (element) => {};

  constructor(title: string, show: boolean, icon: string, onclick: (element) => {}) {
    this.title = title;
    this.show = show;
    this.icon = icon;
    this.onclick = onclick;
  }
}

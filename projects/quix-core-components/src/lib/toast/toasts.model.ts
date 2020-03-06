export class ToastsModel {
  public title: string;
  public text: string;
  public timing: number;
  public type: 'success' | 'warning' | 'error';
  public position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  public date: Date;
  public dateFormat: string;

  constructor(title: string,
              type: 'success' | 'warning' | 'error',
              text?: string,
              timing?: number,
              position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
              date?: Date,
              dateFormat?: string) {
    this.title = title;
    this.type = type;
    this.text = text;
    this.timing = timing;
    if (!position) {
      this.position = 'bottom-right';
    } else {
      this.position = position;
    }
    this.date = date;
    if (!dateFormat) {
      this.dateFormat = 'HH:mm';
    } else {
      this.dateFormat = dateFormat;
    }
  }
}

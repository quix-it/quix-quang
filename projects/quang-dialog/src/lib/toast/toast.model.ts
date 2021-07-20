export class QuixToast {
  constructor (
    public type: 'success' | 'warning' | 'error',
    public title: string,
    public position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right',
    public timing?: number,
    public text?: string,
    public textValue?: any,
    public date?: Date,
    public dateFormat?: string,
  ) {
  }
}

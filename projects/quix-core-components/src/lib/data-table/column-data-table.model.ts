export class ColumnDataTableModel {
  theaderValue: string;
  tfooterValue: string;
  dataParams: string;
  fix?: boolean;

  constructor(theaderValue: string, tfooterValue: string, dataParams: string, fix?: boolean) {
    this.theaderValue = theaderValue;
    this.tfooterValue = tfooterValue;
    this.dataParams = dataParams;
    this.fix = fix;
  }
}

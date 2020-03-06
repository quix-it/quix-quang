export class AutocompleteModel {
  public key: any;
  public value: any;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }
}

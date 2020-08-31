export class QuixConfigModel {
  constructor(
    public googleKey?: string,
    public inputValidClass: string = 'is-valid',
    public inputInvalidClass: string = 'is-invalid'
  ) {
  }
}

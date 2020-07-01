export class QuixAuthModel {
  constructor(
    public oidcConfig: any,
    public storeUser: boolean,
    public initLocale?: boolean,
    public defaultLanguage?: string | 'browser'
  ) {
  }
}

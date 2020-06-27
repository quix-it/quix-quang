export class QuixCoreAuthenticationModel {
  constructor(
    public oidcConfig: any,
    public storeUser: boolean,
    public storeRole: boolean,
    public initStoreLocale?: boolean,
    public initStoreLanguage?: boolean,
    public defaultLanguage?: string | 'browser'
  ) {
  }
}

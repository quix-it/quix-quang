export class QuixCoreAuthenticationModel {
  constructor(
    public oidcConfig: {},
    public storeUser: boolean,
    public storeRole: boolean,
    public initStoreLocale: boolean,
    public initStoreLanguage: boolean,
  ) {
  }
}

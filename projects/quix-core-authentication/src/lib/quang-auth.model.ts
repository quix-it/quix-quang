export class QuangAuthConfig {
  constructor(
    public oidcConfig: any,
    public storeUser: boolean = true,
    public initLocale?: boolean,
    public defaultLanguage?: string | 'browser'
  ) {
  }
}

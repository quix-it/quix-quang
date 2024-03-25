import { type AuthConfig as OpenIdConnectConfig } from 'angular-oauth2-oidc'

export class QuangOpenIdConnectConfig {
  constructor(public oidcConfig: OpenIdConnectConfig) {}
}

import { AuthConfig } from 'angular-oauth2-oidc'

export class QuangAuthConfig {
  /**
   * module config
   * @param oidcConfig
   */
  constructor (
    /**
     * configurations for authentication, necessary if you are in a project,
     * in a module of quix can be defined in config.js
     */
    public oidcConfig: AuthConfig,
  ) {
  }
}

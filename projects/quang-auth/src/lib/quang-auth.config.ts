import { AuthConfig, OAuthResourceServerConfig } from 'angular-oauth2-oidc'

/**
 * module config
 */
export class QuangAuthConfig {
  /**
   * module config constructor
   * @param oidcConfig configurations for authentication
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

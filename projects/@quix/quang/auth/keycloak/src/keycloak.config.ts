import { KeycloakOptions } from 'keycloak-angular'

/**
 * module config
 */
export class QuangKeycloakConfig {
  /**
   * module config constructor
   * @param keycloakConfig keycloak configuration
   * @param ionicApplication define ionic framework
   * @param production define environment
   */
  constructor(
    /**
     *
     */
    public production: boolean = false,
    /**
     * configurations for authentication with keycloak
     */
    public keycloakConfig?: KeycloakOptions,
    /**
     * defines if the application is mobile,
     * this parameter will change the keycloak configurations to start the login process as a mobile application
     */
    public ionicApplication: boolean = false
  ) {}
}

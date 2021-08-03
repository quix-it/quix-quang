import {KeycloakOptions} from "keycloak-angular";

export class QuangKeycloakConfig {
  constructor(
    /**
     * configurations for authentication with keycloak
     */
    public keycloakConfig: KeycloakOptions,
    /**
     * defines if the application is mobile,
     * this parameter will change the keycloak configurations to start the login process as a mobile application
     */
    public ionicApplication: boolean = false,
  ) {
  }
}

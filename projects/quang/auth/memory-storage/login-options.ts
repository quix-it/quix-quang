import { ReceivedTokens } from 'angular-oauth2-oidc'

/**
 * Additional options that can be passed to tryLogin.
 */
export class LoginOptions {
  /**
   * Is called, after a token has been received and
   * successfully validated.
   *
   * Deprecated:  Use property ``events`` on OAuthService instead.
   */
  onTokenReceived?: (receivedTokens: ReceivedTokens) => void

  /**
   * Hook, to validate the received tokens.
   *
   * Deprecated:  Use property ``tokenValidationHandler`` on OAuthService instead.
   */
  validationHandler?: (receivedTokens: ReceivedTokens) => Promise<any>

  /**
   * Called when tryLogin detects that the auth server
   * included an error message into the hash fragment.
   *
   * Deprecated:  Use property ``events`` on OAuthService instead.
   */
  onLoginError?: (params: object) => void

  /**
   * A custom hash fragment to be used instead of the
   * actual one. This is used for silent refreshes, to
   * pass the iframes hash fragment to this method, and
   * is also used by popup flows in the same manner.
   * This can be used with code flow, where is must be set
   * to a hash symbol followed by the querystring. The
   * question mark is optional, but may be present following
   * the hash symbol.
   */
  customHashFragment?: string

  /**
   * Set this to true to disable the oauth2 state
   * check which is a best practice to avoid
   * security attacks.
   * As OIDC defines a nonce check that includes
   * this, this can be set to true when only doing
   * OIDC.
   */
  disableOAuth2StateCheck?: boolean

  /**
   * Set this to true to disable the nonce
   * check which is used to avoid
   * replay attacks.
   * This flag should never be true in
   * production environments.
   */
  disableNonceCheck? = false

  /**
   * Normally, you want to clear your hash fragment after
   * the lib read the token(s) so that they are not displayed
   * anymore in the url. If not, set this to true. For code flow
   * this controls removing query string values.
   */
  preventClearHashAfterLogin? = false

  /**
   * Set this for code flow if you used a custom redirect Uri
   * when retrieving the code. This is used internally for silent
   * refresh and popup flows.
   */
  customRedirectUri?: string
}

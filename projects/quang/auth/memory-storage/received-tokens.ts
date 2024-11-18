/**
 * Represents the received tokens, the received state
 * and the parsed claims from the id-token.
 */
export class ReceivedTokens {
  idToken: string

  accessToken: string

  idClaims?: object

  state?: string
}

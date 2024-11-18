import { Injectable } from '@angular/core'

import { OAuthStorage } from 'angular-oauth2-oidc'

@Injectable()
export class MemoryStorageCulo implements OAuthStorage {
  private data = new Map<string, string>()

  getItem(key: string): string {
    return this.data.get(key) ?? ''
  }

  removeItem(key: string): void {
    this.data.delete(key)
  }

  setItem(key: string, data: string): void {
    this.data.set(key, data)
  }
}

/**
 * Represents the parsed and validated id_token.
 */
export interface ParsedIdToken {
  idToken: string
  idTokenClaims: object
  idTokenHeader: object
  idTokenClaimsJson: string
  idTokenHeaderJson: string
  idTokenExpiresAt: number
}

/**
 * Represents the response from the token endpoint
 * http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint
 */
export interface TokenResponse {
  access_token: string
  id_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
  state?: string
}

/**
 * Represents the response from the user info endpoint
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export interface UserInfo {
  sub: string
  [key: string]: any
}

/**
 * Represents an OpenID Connect discovery document
 */
export interface OidcDiscoveryDoc {
  issuer: string
  authorization_endpoint: string
  token_endpoint: string
  token_endpoint_auth_methods_supported: string[]
  token_endpoint_auth_signing_alg_values_supported: string[]
  userinfo_endpoint: string
  check_session_iframe: string
  end_session_endpoint: string
  jwks_uri: string
  registration_endpoint: string
  scopes_supported: string[]
  response_types_supported: string[]
  acr_values_supported: string[]
  response_modes_supported: string[]
  grant_types_supported: string[]
  subject_types_supported: string[]
  userinfo_signing_alg_values_supported: string[]
  userinfo_encryption_alg_values_supported: string[]
  userinfo_encryption_enc_values_supported: string[]
  id_token_signing_alg_values_supported: string[]
  id_token_encryption_alg_values_supported: string[]
  id_token_encryption_enc_values_supported: string[]
  request_object_signing_alg_values_supported: string[]
  display_values_supported: string[]
  claim_types_supported: string[]
  claims_supported: string[]
  claims_parameter_supported: boolean
  service_documentation: string
  ui_locales_supported: string[]
  revocation_endpoint: string
}

/**
 * Defines the logging interface the OAuthService uses
 * internally. Is compatible with the `console` object,
 * but you can provide your own implementation as well
 * through dependency injection.
 */
export abstract class OAuthLogger {
  abstract debug(message?: any, ...optionalParams: any[]): void
  abstract info(message?: any, ...optionalParams: any[]): void
  abstract log(message?: any, ...optionalParams: any[]): void
  abstract warn(message?: any, ...optionalParams: any[]): void
  abstract error(message?: any, ...optionalParams: any[]): void
}

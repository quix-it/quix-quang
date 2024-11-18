/**
 * Defines a simple storage that can be used for
 * storing the tokens at client side.
 * Is compatible to localStorage and sessionStorage,
 * but you can also create your own implementations.
 */
export abstract class OAuthStorage {
  abstract getItem(key: string): string | null
  abstract removeItem(key: string): void
  abstract setItem(key: string, data: string): void
}

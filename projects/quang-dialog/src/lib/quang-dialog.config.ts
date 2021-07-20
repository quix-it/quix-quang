export class QuangDialogConfig {
  constructor (
    public production: boolean,
    public noErrorUrls?: { url: string, error: number }[],
    public noLoaderUrls?: string[],
    public noLoaderMethods?: string[]
  ) {}
}

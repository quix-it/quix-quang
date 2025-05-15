# Quang Loader

Quang Loader is a fast way to implements an overlay loader to a project.

### QuangLoaderComponent

The `QuangLoaderComponent` is a component that shows a loader in page. It Has a default spinner but it could be replaced with custom content.

To use it:

- Import [QuangLoaderComponent](./loader.component.ts) to your component (suggested app.component.ts).
- Import [quangLoaderInterceptor](./loader-interceptor.ts) and [provideLoader](./loader-providers.ts) to Providers (app.config.ts)

Read [`Component @example`](./loader.component.ts) [`Interceptor @example`](./loader-interceptor.ts) [`Providers @example`](./loader-providers.ts) for usage.

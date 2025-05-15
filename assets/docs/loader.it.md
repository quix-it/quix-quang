# Quang Loader

Quang Loader provides a simple and efficient way to implement an overlay loader in your project. It includes a default spinner but also supports custom content.

## QuangLoaderComponent

The `QuangLoaderComponent` displays a loader overlay on the page. It is highly customizable and can be used to indicate loading states in your application.

### Inputs

- `showAtLeastFor`: `number` — Minimum time (in milliseconds) to show the loader for. Default: `500`.
- You can use `ng-content` to project custom content (e.g., a custom spinner or message).

> **Note:** Loader visibility is managed internally by the loader service and HTTP interceptor, not by an input property.

### Usage

1. **Import the Component**:
   ```typescript
   import { QuangLoaderComponent } from 'quang/loader'
   ```
2. **Add to Template**:
   ```html
   <quang-loader></quang-loader>
   ```
3. **Custom Content**:
   ```html
   <quang-loader>
     <div class="custom-spinner">Loading...</div>
   </quang-loader>
   ```

## Loader Interceptor

The `quangLoaderInterceptor` automatically shows and hides the loader during HTTP requests.

### Usage

1. **Import the Interceptor**:
   ```typescript
   import { quangLoaderInterceptor } from 'quang/loader'

   providers: [
     { provide: HTTP_INTERCEPTORS, useClass: quangLoaderInterceptor, multi: true }
   ]
   ```
2. **Configuration**:
   Configure the interceptor as needed for your application.

## Loader Providers

The `provideQuangLoaderExcludedUrls` function configures the loader globally. It allows you to customize the loader's behavior, including setting delays, custom templates, and excluding specific URLs from triggering the loader.

### Usage

1. **Import the Provider**:
   ```typescript
   import { provideQuangLoaderExcludedUrls } from 'quang/loader';

   providers: [
     provideQuangLoaderExcludedUrls([
       { url: 'assets', method: 'GET' },
       { url: '/api/health', method: 'GET' },
     ]),
   ];
   ```

### Excluding URLs from the Loader

To exclude specific URLs from triggering the loader, use the `provideQuangLoaderExcludedUrls` function. This function accepts an array of URL objects. Any HTTP request matching these URLs will not activate the loader.

Example:

```typescript
provideQuangLoaderExcludedUrls([
  { url: 'assets', method: 'GET' },
  { url: '/api/health', method: 'GET' },
]);
```

In this example, requests to `assets` and `/api/health` with the `GET` method will not show the loader, ensuring that static assets or health check endpoints do not interfere with the user experience.

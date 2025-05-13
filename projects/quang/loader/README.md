# Quang Loader

Quang Loader provides a simple and efficient way to implement an overlay loader in your project. It includes a default spinner but also supports custom content.

## QuangLoaderComponent

The `QuangLoaderComponent` is a component that displays a loader overlay on the page. It is highly customizable and can be used to indicate loading states in your application.

### Usage

1. **Import the Component**:
   Import the `QuangLoaderComponent` into your desired module or component.

   ```typescript
   import { QuangLoaderComponent } from 'quang/loader'
   ```

2. **Add to Template**:
   Use the `QuangLoaderComponent` in your template to display the loader (suggested App.component).

   ```html
   <quang-loader></quang-loader>
   ```

3. **Custom Content**:
   Replace the default spinner with custom content by using the `ng-content` projection.

   ```html
   <quang-loader>
     <div class="custom-spinner">Loading...</div>
   </quang-loader>
   ```

## Loader Interceptor

The `quangLoaderInterceptor` is used to automatically show and hide the loader during HTTP requests.

### Usage

1. **Import the Interceptor**:
   Import the `quangLoaderInterceptor` and add it to your providers.

   ```typescript
   import { quangLoaderInterceptor } from 'quang/loader'

   providers: [{ provide: HTTP_INTERCEPTORS, useClass: quangLoaderInterceptor, multi: true }]
   ```

2. **Configuration**:
   Configure the interceptor in your application to suit your needs.

## Loader Providers

The `provideQuangLoaderExcludedUrls` function is used to configure the loader globally in your application. It allows you to customize the loader's behavior, including setting delays, custom templates, and excluding specific URLs from triggering the loader.

### Usage

1. **Import the Provider**:
   Import the `provideQuangLoaderExcludedUrls` function and use it in your application configuration.

   ```typescript
   import { provideQuangLoaderExcludedUrls } from 'quang/loader';

   providers: [
     provideQuangLoaderExcludedUrls([
       {
         url: 'assets',
         method: 'GET',
       },
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

# Quang Loader

Quang Loader provides a simple and efficient way to implement an overlay loader in your project. It includes a default spinner but also supports custom content.

## QuangLoaderComponent

The `QuangLoaderComponent` is a component that displays a loader overlay on the page. It is highly customizable and can be used to indicate loading states in your application.

### Usage

1. **Import the Component**:
   Import the `QuangLoaderComponent` into your desired module or component.

   ```typescript
   import { QuangLoaderComponent } from 'quang/loader';
   ```

2. **Add to Template**:
   Use the `QuangLoaderComponent` in your template to display the loader.

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
   import { quangLoaderInterceptor } from 'quang/loader';

   providers: [
     { provide: HTTP_INTERCEPTORS, useClass: quangLoaderInterceptor, multi: true },
   ];
   ```

2. **Configuration**:
   Configure the interceptor in your application to suit your needs.

## Loader Providers

The `provideLoader` function is used to configure the loader globally in your application.

### Usage

1. **Import the Provider**:
   Import the `provideLoader` function and use it in your application configuration.

   ```typescript
   import { provideLoader } from 'quang/loader';

   providers: [
     provideLoader({
       delay: 300, // Delay before showing the loader
       customTemplate: '<div>Loading...</div>', // Custom loader template
     }),
   ];
   ```

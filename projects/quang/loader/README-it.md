# Quang Loader

Quang Loader offre un modo semplice ed efficiente per implementare un loader sovrapposto nel tuo progetto. Include uno spinner di default ma supporta anche contenuti personalizzati.

## QuangLoaderComponent

Il `QuangLoaderComponent` mostra un overlay di caricamento sulla pagina. È altamente personalizzabile e può essere usato per indicare stati di caricamento nell'applicazione.

### Input

- `showAtLeastFor`: `number` — Tempo minimo (in millisecondi) per cui mostrare il loader. Default: `500`.
- Puoi usare `ng-content` per proiettare contenuti personalizzati (ad esempio uno spinner o un messaggio custom).

> **Nota:** La visibilità del loader è gestita internamente dal servizio loader e dall'interceptor HTTP, non tramite una proprietà di input.

### Esempio d'uso

1. **Importa il componente**:
   ```typescript
   import { QuangLoaderComponent } from 'quang/loader'
   ```
2. **Aggiungi al template**:
   ```html
   <quang-loader></quang-loader>
   ```
3. **Contenuto personalizzato**:
   ```html
   <quang-loader>
     <div class="custom-spinner">Caricamento...</div>
   </quang-loader>
   ```

## Loader Interceptor

Il `quangLoaderInterceptor` mostra e nasconde automaticamente il loader durante le richieste HTTP.

### Esempio d'uso

1. **Importa l'interceptor**:
   ```typescript
   import { quangLoaderInterceptor } from 'quang/loader'

   providers: [
     { provide: HTTP_INTERCEPTORS, useClass: quangLoaderInterceptor, multi: true }
   ]
   ```
2. **Configurazione**:
   Configura l'interceptor secondo le esigenze della tua applicazione.

## Loader Providers

La funzione `provideQuangLoaderExcludedUrls` configura il loader globalmente. Permette di personalizzare il comportamento del loader, inclusi ritardi, template custom e l'esclusione di specifiche URL dal trigger del loader.

### Esempio d'uso

1. **Importa il provider**:
   ```typescript
   import { provideQuangLoaderExcludedUrls } from 'quang/loader';

   providers: [
     provideQuangLoaderExcludedUrls([
       { url: 'assets', method: 'GET' },
       { url: '/api/health', method: 'GET' },
     ]),
   ];
   ```

### Escludere URL dal Loader

Per escludere specifiche URL dal trigger del loader, usa la funzione `provideQuangLoaderExcludedUrls`. Questa funzione accetta un array di oggetti URL. Qualsiasi richiesta HTTP che corrisponde a queste URL non attiverà il loader.

Esempio:

```typescript
provideQuangLoaderExcludedUrls([
  { url: 'assets', method: 'GET' },
  { url: '/api/health', method: 'GET' },
]);
```

In questo esempio, le richieste a `assets` e `/api/health` con metodo `GET` non mostreranno il loader, assicurando che asset statici o endpoint di health check non interferiscano con l'esperienza utente.

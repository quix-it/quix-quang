# Componente QuangToast

Il `QuangToastComponent` è un componente overlay da usare direttamente nel componente genitore e gestito tramite il `QuangToastService`.

## Funzionalità

- Notifiche toast per la visualizzazione di messaggi
- Durata, tipo e posizione configurabili (tramite servizio)
- Supporta istanze multiple di toast e template personalizzati

## Input

- `showAtLeastFor`: `number` — Tempo minimo (in millisecondi) per cui mostrare il toast. Default: `500`.

> **Nota:** Tutta la configurazione del toast (messaggio, tipo, posizione, timing, ecc.) viene fornita tramite il metodo `QuangToastService.openToast()`, non come input del componente.

## Output

- *(nessuno)* — La chiusura del toast è gestita internamente dal servizio.

## Esempio d'uso

### HTML

```html
<quang-toast />
```

### TypeScript

```typescript
import { inject } from '@angular/core'
import { QuangToastService } from 'quang/overlay/toast'

quangToast = inject(QuangToastService)

openToast(type: 'success' | 'error') {
  quangToast.openToast({
    type,
    title: type === 'success' ? 'Successo' : 'Errore',
    position: 'top-right',
    text: 'Questo è un messaggio toast',
    timing: 5000,
    showCloseButton: true,
  })
}
```

#### Opzioni ToastData

- `type`: `'success' | 'warning' | 'error'` (obbligatorio)
- `title?`: `string`
- `position`: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'top-center' | 'bottom-center'`
- `timing`: `number` (obbligatorio)
- `text?`: `string`
- `showCloseButton?`: `boolean`
- `customTemplate?`: `TemplateRef<any>`
- `customIcon?`: `string`
- `hideHeader?`: `boolean`
- ...e altro (vedi il servizio per l'elenco completo)

## Note

Questo componente utilizza il `QuangToastService` per la gestione dinamica delle istanze toast. Tutta la logica e la configurazione della visualizzazione dei toast è gestita tramite il servizio.

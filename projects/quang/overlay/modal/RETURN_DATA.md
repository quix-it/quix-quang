# QuangModalService - Gestione Informazioni di Ritorno

## Overview

Il `QuangModalService` ora supporta completamente la **gestione delle informazioni di ritorno** dalle modali, permettendo di discriminare quale azione è stata eseguita all'interno della modale (es. quale pulsante è stato cliccato).

## Funzionalità Implementate

### ✅ Observable di Ritorno
Il metodo `showModal()` restituisce un `Observable<object | undefined>` che emette i dati quando la modale viene chiusa.

### ✅ ModalRef Injectable
Classe helper `ModalRef` che può essere iniettata nei componenti modali per facilitare la chiusura con dati.

### ✅ Metodo close() con Dati
Possibilità di passare un oggetto con informazioni quando si chiude la modale.

### ✅ Gestione Automatica Subject
Ogni modale ha il proprio Subject che viene automaticamente completato alla chiusura.

## Utilizzo Base

### 1. Nel Componente Modale

```typescript
import { Component, inject } from '@angular/core';
import { ModalRef } from '@quang/overlay/modal';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div>
      <h2>Conferma</h2>
      <p>Vuoi procedere?</p>
      <button (click)="onConfirm()">Sì</button>
      <button (click)="onCancel()">No</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  private modalRef = inject(ModalRef);

  onConfirm() {
    this.modalRef.close({ action: 'confirm', confirmed: true });
  }

  onCancel() {
    this.modalRef.close({ action: 'cancel', confirmed: false });
  }
}
```

### 2. Nel Componente Chiamante

```typescript
import { Component, inject } from '@angular/core';
import { QuangModalService } from '@quang/overlay/modal';

@Component({
  selector: 'app-main'
})
export class MainComponent {
  private modalService = inject(QuangModalService);

  openConfirmDialog() {
    this.modalService.showModal(
      ConfirmDialogComponent,
      { position: 'center', width: '400px' }
    ).subscribe({
      next: (result) => {
        if (result) {
          const { action, confirmed } = result as { action: string; confirmed: boolean };
          console.log('Azione:', action, 'Confermato:', confirmed);
          
          if (confirmed) {
            this.performAction();
          }
        } else {
          // Modale chiusa senza azione (backdrop click)
          console.log('Modale chiusa senza azione');
        }
      }
    });
  }

  private performAction() {
    // Logica dopo conferma
  }
}
```

## API

### ModalRef

```typescript
class ModalRef {
  /**
   * Chiude la modale passando dati opzionali
   * @param data Dati da passare (es. quale pulsante è stato cliccato)
   */
  close(data?: object): void

  /**
   * Ottiene l'ID della modale corrente
   */
  getId(): string
}
```

### QuangModalService

```typescript
/**
 * Apre una modale e restituisce un Observable con i dati di chiusura
 * @returns Observable che emette i dati quando la modale viene chiusa
 */
showModal<T>(
  component: Type<T>, 
  options: ModalOptions, 
  componentInputs?: Record<string, unknown>
): Observable<object | undefined>

/**
 * Chiude una modale specifica passando dati opzionali
 */
close(id: string, data?: object): void

/**
 * Chiude l'ultima modale aperta (LIFO)
 */
hideModal(id?: string): void
```

## Esempi Avanzati

Vedi il file [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) per esempi completi e casi d'uso avanzati.

## Comportamento

- **Con dati**: Quando si chiama `modalRef.close(data)`, l'Observable emette `data` e si completa
- **Senza dati**: Quando si chiama `modalRef.close()` o si clicca sul backdrop, l'Observable emette `undefined` e si completa
- **Auto-cleanup**: Il Subject viene automaticamente completato, prevenendo memory leak
- **Type-safe**: Usa TypeScript interfaces per tipizzare i dati di ritorno

## Migrazione

### Prima (senza dati di ritorno)
```typescript
this.modalService.showModal(MyComponent, options);
```

### Dopo (con dati di ritorno)
```typescript
this.modalService.showModal(MyComponent, options)
  .subscribe(result => {
    if (result) {
      // Gestisci il risultato
    }
  });
```

## Testing

Nel playground è disponibile un esempio completo in:
- `projects/playground/src/app/pages/overlay-test-pages/modal-service-test-page/`

Apri una modale e clicca sui pulsanti "Save & Close", "Cancel", o "Delete & Close" per vedere i dati di ritorno.

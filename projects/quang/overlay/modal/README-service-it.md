# QuangModalService

Il `QuangModalService` è un servizio che consente di creare e gestire modal programmaticamente nella tua applicazione Angular. Fornisce un'API semplice per aprire, chiudere e gestire più modal dinamicamente con supporto per dati di ritorno.

## Caratteristiche

- **Creazione Dinamica di Modal**: Crea modal programmaticamente passando un tipo di componente
- **Supporto Multi-Modal**: Apri più modal simultaneamente con ID univoci
- **Dati di Ritorno**: Ricevi dati dai modal (es. quale pulsante è stato cliccato)
- **Basato su Observable**: Sottoscrivi ai risultati del modal usando Observable RxJS
- **Helper ModalRef**: Classe iniettabile per chiudere facilmente il modal con dati
- **Gestione LIFO**: Gestione modal last-in, first-out
- **Opzioni Configurabili**: Supporto per varie configurazioni modal (posizione, dimensione, animazione, ecc.)

## Utilizzo

### Esempio Base con Dati di Ritorno

```typescript
import { Component, inject } from '@angular/core'
import { QuangModalService, ModalRef } from 'quang/overlay/modal'

// Componente Modal
@Component({
  selector: 'app-confirm-modal',
  template: `
    <h2>Conferma Azione</h2>
    <button (click)="onConfirm()">Sì</button>
    <button (click)="onCancel()">No</button>
  `
})
export class ConfirmModalComponent {
  private modalRef = inject(ModalRef)

  onConfirm() {
    this.modalRef.close({ action: 'confirm', confirmed: true })
  }

  onCancel() {
    this.modalRef.close({ action: 'cancel', confirmed: false })
  }
}

// Componente Principale
@Component({
  selector: 'app-example',
  template: `<button (click)="openModal()">Apri Modal</button>`
})
export class ExampleComponent {
  private modalService = inject(QuangModalService)

  openModal() {
    this.modalService.showModal(ConfirmModalComponent, {
      position: 'center',
      width: '400px'
    }).subscribe(result => {
      if (result) {
        const { confirmed } = result as { confirmed: boolean }
        if (confirmed) this.performAction()
      }
    })
  }

  private performAction() { }
}
```

### Modal Multipli con Dati

```typescript
this.modalService.showModal(FormComponent, options).subscribe(result => {
  if (result) {
    const { action, data } = result as { action: string; data: any }
    switch (action) {
      case 'save': this.save(data); break
      case 'cancel': console.log('Annullato'); break
    }
  }
})
```

## Riferimento API

### QuangModalService

#### `showModal<T>(component: Type<T>, options?: ModalOptions, componentInputs?: Record<string, unknown>): Observable<object | undefined>`

Apre un modal e restituisce un Observable che emette alla chiusura.

**Restituisce:** Observable che emette i dati di ritorno o `undefined` se chiuso senza dati.

#### `close(id: string, data?: object): void`

Chiude un modal specifico con dati di ritorno opzionali.

#### `hideModal(id?: string): void`

Chiude un modal (LIFO se non viene fornito ID). Emette `undefined`.

### ModalRef

Classe iniettabile per i componenti modal.

#### `close(data?: object): void`

Chiude il modal con dati di ritorno opzionali.

#### `getId(): string`

Restituisce l'ID univoco del modal.

### Opzioni Modal

```typescript
interface ModalOptions {
  position?: 'left' | 'right' | 'center'
  width?: string
  height?: string
  animationMode?: 'FADE' | 'SLIDE_BOTTOM_TO_TOP' | 'SLIDE_TOP_TO_BOTTOM' | 'SLIDE_LEFT_TO_RIGHT' | 'SLIDE_RIGHT_TO_LEFT'
  showBackdrop?: boolean
  padding?: string
}
```

## Migliori Pratiche

1. **Usa ModalRef** nei componenti modal per chiusura facile con dati
2. **Sottoscrivi ai risultati** per gestire i dati di ritorno
3. **Tipizza i tuoi dati** usando interfacce per type safety
4. **Gestisci undefined** - il modal può chiudersi senza dati (click backdrop)
5. **Usa unità relative** (vw, vh, %) per design responsivo

## Esempi

### Modal Form

```typescript
@Component({
  template: `
    <input [(ngModel)]="name" placeholder="Nome" />
    <button (click)="save()">Salva</button>
    <button (click)="cancel()">Annulla</button>
  `
})
export class FormModal {
  private modalRef = inject(ModalRef)
  name = ''
  
  save() {
    this.modalRef.close({ action: 'save', name: this.name })
  }
  
  cancel() {
    this.modalRef.close({ action: 'cancel' })
  }
}

// Uso
this.modalService.showModal(FormModal, { position: 'center' })
  .subscribe(result => {
    if (result && (result as any).action === 'save') {
      console.log('Salvato:', (result as any).name)
    }
  })
```

### Ritorni Type-Safe

```typescript
interface ConfirmResult {
  confirmed: boolean
  action: 'yes' | 'no'
}

this.modalService.showModal(ConfirmComponent, options)
  .subscribe(result => {
    if (result) {
      const { confirmed, action } = result as ConfirmResult
      // TypeScript conosce la struttura
    }
  })
```

### Modal Sequenziali

```typescript
this.modalService.showModal(FirstModal, options)
  .subscribe(firstResult => {
    if (firstResult) {
      this.modalService.showModal(SecondModal, options, { data: firstResult })
        .subscribe(secondResult => {
          console.log({ firstResult, secondResult })
        })
    }
  })
```

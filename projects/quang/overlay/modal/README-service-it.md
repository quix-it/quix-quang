# QuangModalService

Il `QuangModalService` è un servizio che consente di creare e gestire modal programmaticamente nella tua applicazione Angular. Fornisce un'API semplice per aprire, chiudere e gestire più modal dinamicamente.

## Caratteristiche

- **Creazione Dinamica di Modal**: Crea modal programmaticamente passando un tipo di componente
- **Supporto Multi-Modal**: Apri più modal simultaneamente con ID univoci
- **Gestione LIFO**: Gestione modal last-in, first-out (chiusura del modal più recente per primo)
- **Opzioni Configurabili**: Supporto per varie configurazioni modal (posizione, dimensione, animazione, ecc.)
- **Chiusura Basata su ID**: Chiudi modal specifici tramite il loro ID univoco
- **Proiezione Componenti**: Passa qualsiasi componente Angular come contenuto del modal

## Utilizzo

### Esempio Base

```typescript
import { Component, inject } from '@angular/core'
import { QuangModalService } from 'quang/overlay/modal'

@Component({
  selector: 'app-example',
  template: `
    <button (click)="openModal()">Apri Modal</button>
    <button (click)="closeModal()">Chiudi Ultimo Modal</button>
  `
})
export class ExampleComponent {
  private modalService = inject(QuangModalService)
  private lastModalId?: string

  openModal() {
    this.lastModalId = this.modalService.showModal(MyModalContentComponent, {
      position: 'center',
      width: '50vw',
      height: '60vh',
      animationMode: 'FADE'
    })
  }

  closeModal() {
    if (this.lastModalId) {
      this.modalService.hideModal(this.lastModalId)
    }
  }
}
```

### Opzioni Modal

Il metodo `showModal` accetta un'interfaccia `ModalOptions` con le seguenti proprietà:

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

### Modal Multipli

Il servizio supporta l'apertura di più modal simultaneamente:

```typescript
// Apri più modal
const modal1 = this.modalService.showModal(ContentComponent1)
const modal2 = this.modalService.showModal(ContentComponent2)
const modal3 = this.modalService.showModal(ContentComponent3)

// Chiudi l'ultimo modal aperto (modal3)
this.modalService.hideModal()

// Chiudi un modal specifico
this.modalService.hideModal(modal1)
```

## Riferimento API

### Metodi

#### `showModal<T>(component: Type<T>, options?: ModalOptions): string`

Apre un nuovo modal con il componente e le opzioni specificate.

**Parametri:**
- `component`: Il componente Angular da visualizzare nel modal
- `options`: Oggetto di configurazione opzionale per il modal

**Restituisce:**
- `string`: ID univoco del modal creato

#### `hideModal(id?: string): void`

Chiude un modal. Se non viene fornito un ID, chiude l'ultimo modal aperto (comportamento LIFO).

**Parametri:**
- `id`: ID univoco opzionale del modal da chiudere

### Ciclo di Vita del Modal

1. **Creazione**: Quando viene chiamato `showModal`, viene creata una nuova istanza modal con un ID univoco
2. **Gestione**: I modal multipli sono gestiti in uno stack (LIFO)
3. **Chiusura**: I modal possono essere chiusi individualmente per ID o automaticamente (ultimo aperto)
4. **Pulizia**: Le istanze modal sono distrutte correttamente e rimosse dal DOM

## Migliori Pratiche

1. **Memorizza gli ID dei Modal**: Tieni traccia degli ID dei modal se devi chiudere modal specifici
2. **Click su Backdrop**: Abilita il click sul backdrop per una migliore esperienza utente
3. **Design Responsivo**: Usa unità relative (vw, vh, %) per larghezza e altezza
4. **Chiusura Pulita**: Chiudi sempre i modal quando i componenti vengono distrutti
5. **Gestione Errori**: Gestisci i casi in cui i componenti modal potrebbero non riuscire a caricarsi

## Esempi

### Diverse Posizioni

```typescript
// Modal centrale (predefinito)
this.modalService.showModal(ContentComponent, { position: 'center' })

// Modal lato sinistro
this.modalService.showModal(ContentComponent, { position: 'left' })

// Modal lato destro
this.modalService.showModal(ContentComponent, { position: 'right' })
```

### Modalità di Animazione

```typescript
// Animazione fade
this.modalService.showModal(ContentComponent, { animationMode: 'FADE' })

// Scorrimento dal basso
this.modalService.showModal(ContentComponent, { animationMode: 'SLIDE_BOTTOM_TO_TOP' })
```

### Dimensionamento Personalizzato

```typescript
// Modal grande
this.modalService.showModal(ContentComponent, {
  width: '80vw',
  height: '80vh'
})

// Modal compatto
this.modalService.showModal(ContentComponent, {
  width: '400px',
  height: '300px'
})
```

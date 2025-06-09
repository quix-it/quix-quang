# Componente QuangModal

Il `QuangModalComponent` è un componente overlay da utilizzare direttamente nel componente genitore.

## Funzionalità

- Overlay modale per mostrare contenuti
- Dimensioni e posizione configurabili
- Supporta animazioni per apertura e chiusura

## Input

- `position`: `'right' | 'left' | 'center'` (obbligatorio) — Posizione del modal.
- `height`: `string` — Altezza del modal. Default: `'80vh'`.
- `width`: `string` — Larghezza del modal. Default: `'80vw'`.
- `padding`: `string` — Padding interno del modal. Default: `'0 1rem'`.
- `containerClass`: `string` — Classe CSS personalizzata per il contenitore del modal.
- `animationMode`: `'SLIDE_FROM_LEFT_TO_RIGHT' | 'SLIDE_FROM_RIGHT_TO_LEFT' | 'SLIDE_TOP_TO_BOTTOM' | 'SLIDE_BOTTOM_TO_TOP' | 'FADE'` — Modalità di animazione del modal.
- `backgroundColor`: `string` — Colore di sfondo del modal.
- `showBackdrop`: `boolean` — Mostra/nasconde il backdrop. Default: `true`.
- Usa `ng-container` con slot `header`, `body` e `footer` per contenuti personalizzati.

## Output

- `backdropClick`: Emette un evento quando l'utente clicca sul backdrop (fuori dal modal).

## Esempio d'uso

### HTML

```html
<quang-modal
  (backdropClick)="closeModal()"
  animationMode="SLIDE_BOTTOM_TO_TOP"
  height="80vh"
  padding="0"
  position="center"
  [showBackdrop]="true"
>
  <ng-container header>
    <div class="d-flex justify-content-between mt-2">
      <h3>{{ 'title.header' | transloco }}</h3>
      <button
        (click)="closeModal()"
        class="btn btn-outline-secondary"
        type="button"
      >
        X
      </button>
    </div>
  </ng-container>
  <ng-container body>
    <h3>{{ content() }}</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <img
      alt="test"
      src="https://picsum.photos/200/300"
    />
  </ng-container>
  <ng-container footer>
    <div class="d-flex mb-3 gap-3 w-100">
      <h3 class="d-flex flex-column flex-grow-1">{{ 'title.footer' | transloco }}</h3>
      <button
        (click)="closeModal()"
        class="btn btn-outline-secondary"
        type="button"
      >
        {{ 'buttons.close' | transloco }}
      </button>
    </div>
  </ng-container>
</quang-modal>
```

### TypeScript

```typescript
import { signal } from '@angular/core';

showModal = signal(false);
content = signal('Contenuto del Modal');

openModal() {
  showModal.set(true);
}

closeModal() {
  showModal.set(false);
}
```

## Note

Questo componente utilizza i moduli `Overlay` e `Portal` di Angular CDK per il rendering dinamico dei modali. Consulta l'API del componente per tutte le opzioni di configurazione disponibili.

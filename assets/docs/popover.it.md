# Componente QuangPopover

Il `QuangPopoverComponent` è un popover overlay di base con uno stile dedicato, utilizzato tramite la direttiva `[quangPopover]`.

## Funzionalità

- Overlay popover per mostrare informazioni aggiuntive
- Trigger e posizione configurabili (tramite direttiva)
- Supporta contenuto personalizzato tramite `TemplateRef`

## Input (tramite direttiva)

- `quangPopover`: `TemplateRef<any> | null` (obbligatorio) — Il template da mostrare nel popover.
- `overlayPosition`: `string` — Posizione del popover. Accetta valori come `'top'`, `'top-left'`, `'top-right'`, `'bottom'`, `'bottom-left'`, `'bottom-right'`, `'left'`, `'right'`.
- `showMethod`: `string` — Trigger per il popover. Accetta valori come `'click'`, `'hover'`, `'focus'`.
- `payload`: `any` — Dati opzionali da passare al template del popover.

## Output

- _(nessuno)_ — Il popover si chiude automaticamente quando l'utente clicca fuori o attiva la logica di chiusura.

## Esempio d'uso

```html
<button
  [overlayPosition]="'top'"
  [quangPopover]="popoverTemplate"
  [showMethod]="'click'"
>
  Apri Popover
</button>

<ng-template #popoverTemplate>
  <div>Contenuto del Popover</div>
</ng-template>
```

## Note

Questo componente viene utilizzato tramite la direttiva `[quangPopover]` ed estende `QuangBaseOverlayComponent`, ereditando funzionalità come posizionamento dinamico e stile. Il contenuto del popover è sempre fornito come `TemplateRef`.

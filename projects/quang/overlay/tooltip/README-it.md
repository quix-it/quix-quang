# Componente QuangTooltip

Il `QuangTooltipComponent` è un tooltip overlay di base con uno stile dedicato, utilizzato tramite la direttiva `[quangTooltip]`.

## Funzionalità

- Tooltip overlay per mostrare informazioni aggiuntive
- Trigger e posizione configurabili (tramite direttiva)
- Supporta animazioni per apertura e chiusura

## Input (tramite direttiva)

- `quangTooltip`: `string` (obbligatorio) — Il contenuto da mostrare nel tooltip.
- `showMethod`: `'click' | 'hover'` — Specifica il trigger del tooltip. Default: `'hover'`.
- `quangTooltipPosition`: `'top' | 'bottom' | 'left' | 'right'` — Posizione del tooltip. Default: `'top'`.
- `payload`: `unknown` — Dati opzionali da passare al tooltip.

## Output

- *(nessuno)* — Il tooltip si chiude automaticamente quando l'utente clicca fuori o attiva la logica di chiusura.

## Esempio d'uso

```html
<button
  [quangTooltip]="'Questo è un tooltip'"
  [showMethod]="'hover'"
  [quangTooltipPosition]="'top'"
>
  Hover me
</button>
```

## Note

Questo componente utilizza le animazioni Angular per transizioni fluide ed estende `QuangBaseOverlayComponent` per il posizionamento dinamico. Il tooltip viene sempre utilizzato tramite la direttiva `[quangTooltip]`.

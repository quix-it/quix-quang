# Indice Componenti Overlay Quang

Benvenuto nella libreria dei componenti Overlay di Quang! Di seguito trovi l'elenco di tutti i componenti overlay disponibili in questa cartella, con link alla documentazione dettagliata.

## Documentazione dei Componenti

- [Componente Modale](./modal/README-it.md): Un componente modale da usare direttamente nel componente genitore.
- [Componente Popover](./popover/README-it.md): Un popover overlay di base con uno stile dedicato.
- [Componente Toast](./toast/README-it.md): Un componente toast per la visualizzazione di messaggi.
- [Componente Tooltip](./tooltip/README-it.md): Un tooltip overlay di base con uno stile dedicato.

## Note

Tutti i componenti overlay estendono [`QuangBaseOverlayDirective`](./shared/quang-base-overlay.directive.ts), che fornisce funzionalità comuni come etichette, messaggi di errore e altro.

Per utilizzare questi componenti, assicurati di aver installato la dipendenza `@angular/cdk` e di aver incluso il file SCSS necessario:

```scss
@import 'node_modules/quang/overlay/global-overlay.scss';
```

oppure

```scss
@import 'quang/overlay/global-overlay.scss';
```

nei tuoi stili globali (si consiglia la cartella "vendors").

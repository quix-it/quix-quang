# Osservazioni sul codice

Righe aggiunte dai run di documentazione automatica. `Ticket: —` significa osservazione in attesa,
non osservazione già segnalata.

| Repo | Punto | Osservazione | Vista a | Ticket |
| --- | --- | --- | --- | --- |
| quix-quang | `projects/quang/index.ts:provideQuangConfig` | il flag `overlayUsePopover` non ha lettori: la chiave `usePopover` che registra su `OVERLAY_DEFAULT_CONFIG` non è letta da nessuna parte nel repo, e il provider sostituisce il valore del token invece di estenderlo | 68c44102 | QUANG-281 |
| quix-quang | `projects/quang/components/table/table.component.ts:_tdWithPropertiesEffect` | scrive chiavi arbitrarie di `cell.properties` su `nativeElement`, aggirando la sanificazione di Angular; il `JSON.parse` dell'attributo `data-properties` non è protetto e gira dentro un `effect()` | 68c44102 | QUANG-282 |

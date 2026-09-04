# Osservazioni sul codice

Righe aggiunte dai run di documentazione automatica. `Ticket: —` significa osservazione in attesa,
non osservazione già segnalata.

| Repo | Punto | Osservazione | Vista a | Ticket |
| --- | --- | --- | --- | --- |
| quix-quang | `projects/quang/index.ts:provideQuangConfig` | il flag `overlayUsePopover` non ha lettori: la chiave `usePopover` che registra su `OVERLAY_DEFAULT_CONFIG` non è letta da nessuna parte nel repo, e il provider sostituisce il valore del token invece di estenderlo | 68c44102 | QUANG-281 |
| quix-quang | `projects/quang/components/table/table.component.ts:_tdWithPropertiesEffect` | scrive chiavi arbitrarie di `cell.properties` su `nativeElement`, aggirando la sanificazione di Angular; il `JSON.parse` dell'attributo `data-properties` non è protetto e gira dentro un `effect()` | 68c44102 | QUANG-282 |
| quix-quang | `projects/quang/auth/directives/is-authenticated.directive.ts:QuangIsAuthenticatedDirective` | il ramo autenticato dell'effect non assegna il risultato di `createEmbeddedView` a `embeddedViewRef`: la guardia resta sempre vera e ogni rivalutazione aggiunge una view senza togliere la precedente. Le tre direttive sorelle assegnano | 68c44102 | QUANG-285 |
| quix-quang | `projects/quang/components/autocomplete/autocomplete.component.ts:handleInputKeydown` | registra un listener `keydown` sull'ultimo chip a ogni Backspace sulla casella, senza rimuoverlo né controllare se c'è già: i listener si sommano sullo stesso bottone e un solo Backspace cancella più chip | 68c44102 | QUANG-286 |
| quix-quang | `projects/quang/auth/auth-providers.ts:withAuth` | si dichiara `QuangFeatureKind.LoaderFeature` invece di `AuthFeature`, che resta l'unico valore dell'enum mai usato. Innocuo a runtime — `ɵkind` non è letto da nessuna parte — ma il tipo di ritorno mente sulla feature | 68c44102 | — |
| quix-quang | `projects/quang/index.ts:QUANG_CONFIG` | il token è dichiarato ed esportato ma non viene registrato da `provideQuangConfig` né iniettato in nessun punto del repo: chi lo inietta non riceve la configurazione | 68c44102 | — |

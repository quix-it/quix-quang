# Configurazione Quang

## Cosa fa

È il punto di ingresso della libreria in un'applicazione: una funzione da mettere nei `providers`
della `ApplicationConfig`, che stabilisce il base href, il livello di log e la configurazione di
default degli overlay, e che raccoglie le parti opzionali della libreria (autenticazione, traduzioni,
loader) passate come argomenti successivi.

Chi usa la libreria non attiva le parti opzionali con moduli o import separati: le passa qui, sotto
forma di funzioni `with*`.

## Entry point

- `projects/quang/index.ts` — `provideQuangConfig(config?, ...features)`, l'unica funzione che
  l'applicazione chiama.
- `projects/quang/index.ts` — il token `QUANG_LOGGING_BEHAVIOR`, che le altre aree iniettano per
  decidere se scrivere in console.
- `projects/quang/index.ts` — `quangFeature(kind, providers)` e i tipi `QuangFeature` /
  `QuangFeatures`, con cui le altre aree costruiscono le proprie funzioni `with*`.

Uso reale in `projects/playground/src/app/app.config.ts`.

## Come funziona

`provideQuangConfig` costruisce un `EnvironmentProviders` con quattro cose:

1. `APP_BASE_HREF` con `config.baseHref`, e `'/'` quando manca.
2. `QUANG_LOGGING_BEHAVIOR` con `'verbose'` se `config.verbose` è vero, `'normal'` altrimenti. Il
   valore non è un livello numerico: chi lo legge confronta con la stringa `'verbose'`.
3. I `ɵproviders` di ogni feature passata, appiattiti nell'array.
4. `OVERLAY_DEFAULT_CONFIG` del CDK, sostituito con `{ usePopover: false }` — ma **solo quando
   `overlayUsePopover` è falso o assente**. La condizione è invertita rispetto a come si legge il
   nome: passare `overlayUsePopover: true` non attiva niente, si limita a non registrare quel
   provider.

Il meccanismo delle feature è quello di Angular per le funzioni `with*`: `quangFeature` impacchetta
`{ ɵkind, ɵproviders }`, e `provideQuangConfig` legge **solo** `ɵproviders`. `ɵkind` non è letto da
nessuna parte nel repo: serve a tipare la funzione in fase di compilazione, non a distinguere le
feature a runtime. Una feature che si dichiara del tipo sbagliato viene comunque registrata.

Il registro delle osservazioni annota due punti di questo file: il flag `overlayUsePopover` senza
lettori (`docs/automatica/osservazioni.md`, QUANG-281) e il token `QUANG_CONFIG`, esportato ma mai
registrato né iniettato.

## Dipende da

Nessun condiviso del repo. Il confine esterno è `@angular/cdk/overlay`, di cui questa voce
sovrascrive il token `OVERLAY_DEFAULT_CONFIG`, e `@angular/common` per `APP_BASE_HREF`.

Le voci `Autenticazione`, `Traduzioni` e `Loader` si innestano qui attraverso `quangFeature`.

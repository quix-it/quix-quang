# Traduzioni

## Cosa fa

Configura le traduzioni di un'applicazione in una chiamata sola: quali lingue esistono, quale si usa
all'avvio, su quale ripiegare quando manca una chiave, e da dove scaricare i file con i testi. Sotto
c'è Transloco, e la libreria ne fissa i default e il modo di caricare i file.

Dà anche un servizio con cui l'applicazione cambia lingua, legge quella attiva e traduce una chiave da
codice. Il cambio di lingua accetta solo le lingue dichiarate: una lingua sconosciuta riporta a quella
di default invece di lasciare l'applicazione senza testi.

## Entry point

L'entry point secondario è `quang/translation` (`projects/quang/translation/index.ts`).

- `provideTranslation(config)` — `projects/quang/translation/translation-providers.ts`. Provider di
  ambiente da mettere nella configurazione dell'applicazione.
- `withTranslation(config)` — stesso file. La stessa configurazione in forma di feature di
  `provideQuangConfig`, con il tipo `QuangFeatureKind.TranslationFeature`.
- `QuangTranslationService` — `projects/quang/translation/translation.service.ts`.
- `QuangTranslationLoaderService` — `projects/quang/translation/translation-loader.service.ts`.
- `AVAILABLE_LANGS`, `DEFAULT_LANG`, `FALLBACK_LANG`, `TRANSLATIONS_BASE_PATH` —
  `projects/quang/translation/translations.tokens.ts`.

## Come funziona

**La configurazione.** `TranslationConfig` chiede tre campi — lingue disponibili, lingua di default,
lingua di ripiego — e ne rende opzionali altri sette, che diventano la configurazione di Transloco con
questi default: rendering di nuovo al cambio di lingua attivo, modalità di produzione attiva, un solo
tentativo in più per un file che non si scarica, e per le chiavi mancanti log in console attivo, uso
della lingua di ripiego attivo, traduzione vuota non accettata come valida.

Oltre a Transloco, `provideTranslation` registra i due servizi della feature e scrive i quattro token
con i valori ricevuti. `TRANSLATIONS_BASE_PATH` viene sempre fornito, anche con valore `undefined`
quando la configurazione non lo passa. `FALLBACK_LANG` è fornito ma nessun codice del repo lo inietta.

`withTranslation` non aggiunge niente: avvolge `provideTranslation` nella forma di feature, così che
la configurazione delle traduzioni possa stare dentro `provideQuangConfig` insieme alle altre.

**Il caricamento dei file.** Il loader scarica `<base>assets/i18n/<lingua>.json` con `HttpClient`, dove
`<base>` è `TRANSLATIONS_BASE_PATH` o `./` se manca. La base è concatenata così com'è, quindi va
passata **con la barra finale**. Il loader usa `HttpClient`: l'applicazione deve fornirlo, e le
richieste dei file di traduzione passano dagli interceptor registrati: il playground, per esempio,
esclude le richieste `GET` verso `assets` dall'interceptor del loader.

**Il servizio.** `QuangTranslationService` non è registrato in root: esiste solo dove è stato chiamato
`provideTranslation`. Tiene la lingua attiva in un segnale `activeLang` alimentato dal flusso dei
cambi di lingua di Transloco, con valore iniziale `null`. `setActiveLang` controlla la lingua contro
`AVAILABLE_LANGS` e, se non c'è, imposta `DEFAULT_LANG`. `translate`, `setTranslation` e
`setTranslationKey` passano a Transloco senza aggiungere niente.

Il componente date della libreria inietta il servizio in modo opzionale, per scegliere la lingua del
calendario quando non gliela si passa: senza `provideTranslation` l'iniezione restituisce `null` e il
componente non si rompe.

## Dipende da

- **Configurazione Quang** (`features/configurazione-quang.md`) — `quangFeature` e
  `QuangFeatureKind` per la forma di feature di `withTranslation`.

Confini esterni: `@jsverse/transloco` per tutto il meccanismo di traduzione, `@angular/common/http`
per il download dei file.

# Conversione e download

## Cosa fa

Cinque funzioni libere — nessuna classe, nessun servizio, nessuna dipendenza da Angular tranne un
tipo — che coprono due cose imparentate: trasformare un contenuto binario fra `Blob`, data URI e
`File`, e far partire il salvataggio di un file dal browser.

Il caso d'uso completo è la risposta di un'API che restituisce un allegato: si passa la
`HttpResponse<Blob>` così com'è a una funzione, e il file arriva nella cartella dei download con il
nome che il server ha dichiarato.

Le funzioni non hanno stato e non si iniettano: si importano e si chiamano.

## Entry point

- `projects/quang/data-handling/index.ts` — l'entry point secondario `quang/data-handling`, che
  riesporta i due moduli interi.
- `projects/quang/data-handling/conversion.ts` — `blobToBase64`, `base64ToDataUri`, `dataUriToBlob`.
- `projects/quang/data-handling/download.ts` — `downloadFile`, `handleDownload`.

Nessuna delle due directory dichiara un proprio `ng-package.json`: l'unico entry point pubblicato è
`quang/data-handling`, non i due sottopath.

## Come funziona

### La conversione

`blobToBase64` avvolge `FileReader` in una promessa: registra `onloadend` e `onerror`, poi chiama
`readAsDataURL`. Il valore risolto è quindi quello che `readAsDataURL` produce, cioè un data URI
completo nella forma `data:<tipo>;base64,<payload>` — **non** il solo payload base64 che il nome
della funzione suggerisce. Il tipo dentro il data URI è quello del `Blob` di partenza, non un
parametro.

Questo decide come le tre funzioni si compongono. `base64ToDataUri` è una concatenazione di stringhe
che aggiunge il prefisso `data:<tipo>;base64,`, con `application/octet-stream` come tipo di default:
darle in pasto il risultato di `blobToBase64` produce un prefisso doppio. Il giro completo che
funziona è `blobToBase64` → `dataUriToBlob`, e salta la funzione in mezzo; il round-trip nello spec
(`conversion.spec.ts:144`) è scritto esattamente così, con un commento che lo dice.

`base64ToDataUri` serve quando il base64 arriva da fuori — un campo di una risposta JSON — e va reso
utilizzabile come sorgente di un `<img>` o di un `<a>`.

`dataUriToBlob` non decodifica niente da sé: passa il data URI a `fetch` e ne prende il `.blob()`.
Il tipo del blob risultante è quello dichiarato nel data URI, perché è `fetch` a leggerlo.

Tutte e tre sono dichiarate `async`, anche `base64ToDataUri` che non attende nulla: chi le chiama
riceve sempre una promessa.

### Il download

`downloadFile` è il gesto minimo: crea un `<a>` staccato dal documento — non lo appende mai — gli
mette come `href` un object URL del file, come `download` il nome richiesto, chiama `click()`, poi
revoca l'object URL e rimuove l'elemento. La revoca è **sincrona, subito dopo il click**: non
aspetta che il browser abbia iniziato a leggere l'URL.

`handleDownload` è lo strato sopra, quello pensato per una risposta HTTP, e fa tre cose in ordine.

Primo, rifiuta il corpo vuoto: se `body` è nullo lancia `new Error('No body')` e non prosegue. È
l'unico errore che questa area propaga al chiamante.

Secondo, ricava il nome del file dall'header `content-disposition` con una regex che accetta il
valore fra apici singoli, fra apici doppi o nudo, e poi toglie gli apici. Il ramo di ripiego non è
un `if`: l'estrazione è scritta con un'asserzione di non-nullità (`r.exec(...)![1]`), quindi quando
l'header manca o non corrisponde `exec` restituisce `null`, l'indicizzazione lancia, e il `catch`
attorno produce il nome di ripiego `download-<timestamp>.<estensione>`. L'estensione di ripiego è un
parametro, con `xls` come default — un'eredità del caso d'uso da cui l'area è nata, non una scelta
sul contenuto.

Terzo, costruisce un `File` con il corpo, il nome deciso e il `content-type` della risposta. Quando
quell'header manca, il tipo diventa la stringa letterale `'blob'`, che non è un MIME type: il file
scaricato porta quindi un tipo che nessun sistema riconosce. Poi delega a `downloadFile`.

## Dipende da

Nessun condiviso della libreria: quest'area non importa niente da dentro `projects/quang/`.

Confini esterni:

- `@angular/common/http` — solo il tipo `HttpResponse`, per la firma di `handleDownload`. È l'unica
  cosa di Angular che l'area tocca.
- API del browser — `FileReader`, `fetch`, `URL.createObjectURL` / `revokeObjectURL`, `File`,
  `document.createElement`. Tutte usate direttamente, senza astrazione in mezzo: l'area non gira
  fuori da un browser.

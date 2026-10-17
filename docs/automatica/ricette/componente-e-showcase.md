# Aggiungere o estendere un componente con la sua showcase

## Quando serve

Si aggiunge un componente a `quang/components/`, o un input a uno esistente, e lo si vuole vedere
nel playground: una pagina «showcase» con esempi eseguibili, il codice da copiare e il README del
componente in inglese e in italiano. Vale anche quando si porta un componente che aveva solo la
vecchia pagina di test alla showcase.

## File da toccare

Nell'ordine, con `<nome>` il nome della cartella del componente:

1. Il componente, `projects/quang/components/<nome>/`: `<nome>.component.ts`, `.html`, `.scss`,
   lo spec `<nome>.component.spec.ts` e, se il template cambia, `__snapshots__/`. Per un componente
   nuovo anche `index.ts` (`export * from './<nome>.component'`) e `ng-package.json`.
2. I README del componente, `projects/quang/components/<nome>/README.md` e `README-it.md`.
3. Gli esempi, `projects/playground/src/app/pages/components-test-pages/<nome>-test/examples/`: un
   file `<nome>-<caso>-example.component.ts` per esempio e `index.ts` che li riesporta.
4. La showcase, `.../<nome>-test/showcase/<nome>-showcase.component.{ts,html,scss}`.
5. Le rotte, `.../components-test-pages/components-test-pages.routes.ts`.
6. Le traduzioni del playground, `projects/playground/src/assets/i18n/en.json` e `it.json`.
7. Per un componente nuovo, la voce di menu in `projects/playground/src/app/core/menu/menuList.ts`.

## Passi

1. Nel componente, il nuovo comportamento è un `input()` o un `output()` del componente, che estende
   la base comune (vedi [Base dei componenti](../condivisi/base-componenti.md)); un enum che
   l'input accetta sta nello stesso file del componente e va esposto al template come proprietà
   `protected` (così fa `TabsOrientation` in `tabs.component.ts`). L'`index.ts` della cartella
   riesporta tutto il file, quindi l'enum arriva a `quang/components/<nome>` senza altre righe.
2. Un componente nuovo prende un `ng-package.json` con `entryFile: index.ts`, come
   `projects/quang/components/tabs/ng-package.json`: è quello che lo pubblica come entry point
   secondario `quang/components/<nome>`.
3. Documenta l'input in `README.md` e in `README-it.md`, con gli stessi esempi.
4. Scrivi l'esempio in `examples/`: un componente standalone con il template inline, più due
   costanti stringa `<NOME>_<CASO>_TS` e `<NOME>_<CASO>_HTML` che riportano il codice da mostrare.
   Riesportali tutti e tre da `examples/index.ts`.
5. Nella showcase importa l'esempio e le due costanti, assegnale a proprietà `protected` e aggiungi
   una `div.example-section` con un `id` e un `playground-example-viewer` (`title`, `description`,
   `tsCode`, `htmlCode`) che contiene l'esempio; aggiungi la voce all'indice della pagina
   (`nav.showcase-toc`, che scorre all'`id` con `scrollTo`). In fondo, `playground-component-documentation`
   con `readmeOnly` e il path del README scelto dalla lingua attiva.
6. Una showcase nuova va su `components/<nome>` in `components-test-pages.routes.ts`; la vecchia
   pagina di test, se c'è, scende a `components/<nome>/test`.
7. Aggiungi le chiavi `title.components.<nome>`, `examples.<nome>.*` e, per un componente nuovo,
   `menu.components.<nome>` in `en.json` e in `it.json`.

## Convenzioni

- **Le costanti `_TS` e `_HTML` sono copie a mano del codice dell'esempio**, non lo leggono: un
  esempio cambiato senza ritoccarle mostra nel playground codice diverso da quello che gira.
- **Il README arriva al playground da `scripts/copy-readme.js`**, che gira prima di
  `start:playground`, `build:playground` e `deploy:git` e copia ogni file con `readme` nel nome
  sotto `projects/quang/` in `projects/playground/src/assets/docs/`, rinominato
  `<cartella><resto del nome senza README>.md`: `README.md` diventa `<nome>.md`, `README-it.md`
  diventa `<nome>-it.md`, con `<nome>` la cartella del componente e non la rotta (la showcase su
  `components/toggle` legge `checkbox.md`). Il path che la showcase passa a `customReadmePath` deve seguire questo
  nome: le showcase esistenti chiedono `<nome>.it.md`, che lo script non produce (è nel registro
  delle osservazioni).
- **`en.json` e `it.json` del playground hanno le stesse chiavi**: una chiave in uno solo dei due
  mostra la chiave grezza nell'altra lingua.
- **Il template del componente ha snapshot**: lo spec di tabs confronta `container.innerHTML` con
  `__snapshots__/tabs.component.spec.ts.snap`, che va rigenerato quando il markup cambia.
- I commit di questa forma aggiungono anche una sezione in `CHANGELOG.md` con la versione, divisa
  in `Added`, `Changed`, `Fixed`, `Docs`.

## Come si verifica

- `npm test`: Vitest sui soli spec di `projects/quang/` (`include` di `vite.config.ts`), snapshot
  compresi. Il playground non ha test.
- `npm run build:quang` per l'entry point nuovo, e `npm run build:playground` per la showcase.
- `npm run start:playground` e la pagina `components/<nome>` nelle due lingue: gli esempi girano, il
  codice mostrato è quello dell'esempio, il README compare.
- Il resto del playground è descritto in [Playground](../features/playground.md).

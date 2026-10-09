# Wysiwyg

## Cosa fa

Un campo di testo ricco: chi lo usa scrive e formatta, e il valore che arriva al form è **HTML**.
L'editor vero e proprio è SunEditor, una libreria di terze parti; il componente lo avvolge e lo lega
al form Angular come tutti gli altri campi della libreria.

Attorno all'editor mostra le stesse cose degli altri campi: etichetta con l'asterisco quando è
obbligatorio, messaggio di successo, messaggio di errore, messaggio di aiuto in linea o in un
tooltip.

La barra dei pulsanti si compone accendendo o spegnendo venti input booleani, uno per gruppo di
pulsanti — tutti accesi di default. Chi ha bisogno di più controllo può passare direttamente le
opzioni di SunEditor.

## Entry point

- `projects/quang/components/wysiwyg/wysiwyg.component.ts` — il componente `<quang-wysiwyg>`,
  esportato dall'entry point secondario `quang/components/wysiwyg`.
- Input propri: `minHeight` (default `200px`), i venti interruttori dei pulsanti (`font`, `fontSize`,
  `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`,
  `fontColor`, `highlightColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`,
  `image`, `fullScreen`, `showBlocks`), i due agganci `onImageUploadError` e `onFileDrop`, e
  `wysiwygOptions` per le opzioni native.
- Proiezione di contenuto: lo slot `[help-icon]`, usato solo quando il messaggio di aiuto è
  configurato come tooltip.
- Fogli di stile: oltre a quello del componente, il pacchetto pubblica come asset
  `global-wysiswyg.component.scss`, che va importato a livello di applicazione perché SunEditor
  disegna parte della propria interfaccia fuori dal componente.

## Come funziona

Nel template c'è una `textarea`, che SunEditor sostituisce con la propria interfaccia alla creazione.
È il punto di aggancio, non la sorgente del contenuto: il testo non passa mai da quella `textarea`.

La creazione avviene dentro un effect, che si riesegue quando cambia una delle cose da cui dipende —
gli interruttori dei pulsanti, l'altezza minima, la sola lettura, lo stato del controllo di form.
**Alla prima esecuzione crea l'istanza, alle successive la riconfigura**: non ne fabbrica una nuova,
riapplica le opzioni a quella che c'è.

La barra dei pulsanti passa da qui: gli interruttori accesi diventano, in ordine fisso, l'elenco dei
nomi che SunEditor conosce. Se il controllo di form è disabilitato **o** il componente è in sola
lettura, l'elenco che viene passato è vuoto: l'editor resta visibile e il testo leggibile, ma senza
barra.

Dopo la configurazione il componente riaggancia i propri gestori agli eventi dell'editor: il
cambiamento del contenuto passa al gestore della base — che scrive il valore e notifica il form — e
poi chiede esplicitamente un giro di rilevamento delle modifiche, perché l'evento arriva da fuori
Angular. L'uscita dal campo passa al gestore del blur della base.

Il valore che arriva dal form segue una strada a parte. La scrittura del valore aggiorna subito il
segnale della base, poi **aspetta che l'istanza dell'editor esista** — resta in ascolto e agisce alla
prima istanza disponibile — e solo allora le passa il contenuto. È così che un valore già presente
nel form, scritto prima che l'editor sia creato, non va perso.

### L'obbligatorietà su del markup vuoto

Un editor di testo ricco non è mai davvero vuoto: appena si tocca produce dei tag, e per il validatore
`required` di Angular un contenuto fatto di soli tag è un valore valorizzato. Il componente ha quindi
un controllo proprio: toglie tutti i tag dal valore e, se quello che resta è la stringa vuota mentre
il controllo ha il validatore `required`, scrive l'errore `required` direttamente sul controllo.

Quel controllo **non è registrato come validatore**: il componente si dichiara solo come accessore di
valore. Viene richiamato a mano a ogni cambiamento del contenuto, quindi vale da quando l'utente
tocca il campo in poi, non sul valore iniziale.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form,
  da cui arrivano valore, id, etichetta, stato di validazione, messaggi di errore e successo, e i
  gestori di cambiamento e blur. Vedi `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per mostrare il messaggio di aiuto in un
  tooltip. Vedi `docs/automatica/features/tooltip.md`.

Confini esterni: `suneditor` è l'editor vero e proprio, con le sue opzioni e i suoi plugin, e i tipi
delle opzioni del componente sono i suoi; `@jsverse/transloco` traduce etichetta, segnaposto e
messaggi.

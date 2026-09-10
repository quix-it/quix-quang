# Input

## Cosa fa

Il campo di testo generico della libreria. Un solo componente copre nove tipi — testo, area di
testo, password, email, numero, url, ricerca, telefono, colore — scelti con un input obbligatorio.
Si lega a un form Angular e mostra etichetta, asterisco di obbligatorietà, messaggi di errore e di
successo, messaggio di aiuto in linea o dentro un tooltip.

Sulla password può mostrare un bottone che rivela e nasconde il testo digitato.

## Entry point

- `projects/quang/components/input/input.component.ts` — il componente `<quang-input>`, esportato
  dall'entry point secondario `quang/components/input`.
- Input propri: `componentType` (obbligatorio), `maxLengthText`, `minLengthText`, `minNumber`,
  `maxNumber`, `componentStep`, `resizable`, `showHidePasswordButton`, `buttonClass`.
- Proiezione di contenuto: gli slot `[show-password]` e `[hide-password]` per le due icone del
  bottone della password, e `[help-icon]` per il tooltip del messaggio di aiuto.

## Come funziona

Quasi tutto arriva dalla base dei componenti di form: valore, validazione, id, errori, blur e la
propagazione al controllo. Il componente aggiunge tre cose.

La prima è la scelta dell'elemento. Il tipo `textarea` non è un tipo HTML di `input`, quindi il
template ha due rami distinti: uno rende un `input` con il tipo passato, l'altro un `textarea`. I
due rami non condividono tutti gli attributi — il ramo dell'area di testo non dichiara
l'obbligatorietà all'HTML, e non ha il bottone. L'intero componente non rende nulla finché il tipo
non è valorizzato.

La seconda è la password. Il tipo effettivo dell'elemento è calcolato, non è quello passato: quando
il tipo è `password` e la visibilità è attiva, l'elemento diventa di tipo `text`. Il bottone si
limita a invertire quel segnale, ed esiste solo se il tipo è `password` **e** l'apposito input è
attivo. Il click è protetto contro il controllo disabilitato.

La terza è un vincolo di sequenza che non si vede dal template: il componente riascolta il proprio
tipo e, a ogni cambio, rifà l'aggancio al controllo di form. Serve perché l'aggancio della base
avviene una volta sola, dopo il primo rendering; cambiare tipo a caldo sostituisce l'elemento nel
DOM, e senza il riaggancio il campo resterebbe legato allo stato di validazione precedente.

I limiti numerici e di lunghezza sono passati all'HTML, non validati qui: la validazione resta del
`FormControl`, e questi input servono al comportamento del browser (le frecce del campo numerico, il
troncamento della digitazione). Il valore propagato al form è sempre quello che l'elemento HTML
espone come testo, anche per il tipo numerico.

L'input `resizable` agisce solo sull'area di testo, aggiungendo la classe che ne blocca il
ridimensionamento manuale.

Il registro delle osservazioni annota due punti di questo file: l'etichetta di accessibilità del
bottone della password e il tipo del valore propagato dal campo numerico
(`docs/automatica/osservazioni.md`).

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form.
  Vedi `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per il messaggio di aiuto. Vedi
  `docs/automatica/features/tooltip.md`.

Confine esterno: `@jsverse/transloco` traduce etichetta, segnaposto e messaggi.

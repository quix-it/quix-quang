# Checkbox

## Cosa fa

Una casella di spunta che si lega a un form Angular e vale `true` o `false`. Lo stesso componente
rende due aspetti diversi — la casella classica o un interruttore a levetta — scelti con un input
obbligatorio: chi lo usa deve dichiarare quale dei due vuole, non c'è un default.

Attorno al controllo mostra le stesse cose degli altri campi della libreria: etichetta con
l'asterisco quando il campo è obbligatorio, messaggio di successo, messaggio di errore, messaggio di
aiuto (in linea oppure dentro un tooltip). L'etichetta si può mettere su uno dei quattro lati.

## Entry point

- `projects/quang/components/checkbox/checkbox.component.ts` — il componente `<quang-checkbox>`,
  esportato dall'entry point secondario `quang/components/checkbox`.
- Input propri: `checkType` (obbligatorio, `'checkbox'` o `'toggle'`), `labelPosition`
  (`'top' | 'left' | 'right' | 'bottom'`, default `'top'`), `removeMargin`.
- Proiezione di contenuto: lo slot `[help-icon]`, usato solo quando il messaggio di aiuto è
  configurato come tooltip.

## Come funziona

Il componente estende la base dei componenti di form e da lì eredita quasi tutto: valore, stato di
validazione, id generato, gestione degli errori, blur. Il codice proprio è una sola cosa, ed è
quella che conta.

La base, quando arriva un evento dal campo, legge `value` dall'elemento HTML. Su una casella di
spunta quella proprietà non dice se è spuntata: vale la stringa `"on"` sia da spuntata sia da
vuota. Il componente riscrive quindi il gestore dell'evento per leggere `checked` e propagare il
booleano. È l'unico metodo che sovrascrive, e senza di esso il form riceverebbe sempre la stessa
stringa.

Il resto è nel template. Il tipo scelto non cambia l'elemento HTML — resta sempre un `input` di tipo
`checkbox` — ma cambia due cose: le classi che gli danno l'aspetto a levetta, e il ruolo di
accessibilità dichiarato, che diventa `switch` invece di `checkbox`. Chi legge con uno screen reader
sente quindi la differenza fra i due modi, non solo chi guarda.

La posizione dell'etichetta è una classe sul contenitore, una per lato, e l'input `removeMargin`
toglie insieme il margine inferiore e la classe di impaginazione della riga: le due cose vanno
insieme, non sono separabili dall'esterno.

Lo stato disabilitato arriva dalla base — che lo calcola dal controllo di form o dall'input di sola
lettura — e oltre a disabilitare il campo toglie il cursore a mano dal cursore del mouse.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form,
  da cui arrivano valore, validazione, id, etichetta, errori e il gestore del blur. Vedi
  `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per mostrare il messaggio di aiuto in un
  tooltip. Vedi `docs/automatica/features/tooltip.md`.

Confine esterno: `@jsverse/transloco` traduce etichetta, segnaposto e messaggi.

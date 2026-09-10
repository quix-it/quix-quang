# Date

## Cosa fa

Un campo per scegliere una data, un orario, o un intervallo fra due date. La casella si può
compilare a mano oppure aprendo un calendario, e il valore che finisce nel form è sempre una stringa
ISO in UTC — non quello che si legge nella casella, che è formattato secondo il formato configurato.

Ha quattro modi d'uso, combinabili solo in parte: la data sola, la data con l'orario, il solo
orario, e l'intervallo. L'intervallo esclude l'orario. Il calendario può stare in una tendina che si
apre al click, oppure essere sempre visibile in linea; in quel caso la casella di testo sparisce
alla vista e all'accessibilità, e il componente diventa il solo calendario.

## Entry point

- `projects/quang/components/date/date.component.ts` — il componente `<quang-date>`, esportato
  dall'entry point secondario `quang/components/date`.
- Input di formato e lingua: `dateFormat` (default `dd/MM/yyyy`), `timeFormat` (default `HH:mm`),
  `activeLanguageOverride`.
- Input di modo: `timepicker`, `showOnlyTimepicker`, `rangeSelection`, `showInline`,
  `multipleDatesSeparator`.
- Input di limite: `minDate`, `maxDate`, `minHour`, `maxHour`, `minMinute`, `maxMinute`.
- Input di aspetto e fuga: `calendarClasses`, `buttonClass`, `datepickerOptions` — quest'ultimo dà
  accesso diretto alle opzioni della libreria del calendario.
- Proiezione di contenuto: il contenuto senza selettore diventa l'icona del bottone che apre il
  calendario; senza contenuto proiettato il bottone resta nascosto. Lo slot `[help-icon]` è per il
  tooltip del messaggio di aiuto.

## Come funziona

Il calendario non è scritto qui: è un'istanza di `air-datepicker` costruita sull'elemento della
casella. Tutta la logica del componente sta nel tenere allineate tre cose che possono divergere — il
testo nella casella, la selezione del calendario, e il valore del controllo di form.

Il montaggio del calendario sta in un solo metodo, richiamato da un `effect`: ogni volta che cambia
un input che lo riguarda, il metodo ricostruisce le opzioni e le applica. Se l'istanza esiste già la
aggiorna invece di ricrearla, e l'aggiornamento è silenzioso quando il calendario non è visibile,
così non si riapre da solo. Un'eccezione: il passaggio fra tendina e calendario in linea non è
applicabile a caldo, quindi il componente ricorda con quale dei due modi ha creato l'istanza e la
distrugge per rifarla quando quel modo cambia.

**Il valore non raggiunge il form appena si sceglie una data.** Il componente sovrascrive il metodo
che la base usa per propagare, e la sua versione normalizza il valore e lo scrive nel segnale
interno, ma non chiama la propagazione della base. Il passaggio al controllo avviene in un secondo
metodo, invocato alla chiusura del calendario e, nel modo in linea, subito dopo ogni selezione —
perché un calendario in linea non si chiude mai e altrimenti il valore non partirebbe mai. Questo
spiega perché nel modo a tendina il `formControl` si aggiorna quando il calendario si chiude, non al
click sul giorno.

La normalizzazione è la regola di dominio del componente: quando l'orario non è in gioco, la parte
oraria viene azzerata a `T00:00:00.000Z` prima di scrivere; quando è in gioco il solo orario, la
parte di data viene ripresa dal valore corrente, così cambiare l'ora non sposta il giorno. La
conversione a UTC non usa il fuso: sottrae lo scarto del fuso locale dal timestamp, cioè conserva il
giorno che l'utente ha visto invece dell'istante assoluto. Se il valore normalizzato coincide con
quello corrente il metodo esce senza scrivere, e questo interrompe il ciclo fra selezione e
riallineamento del calendario.

Sull'intervallo c'è un vincolo di sequenza: la libreria del calendario notifica anche le selezioni
parziali, quando l'utente ha scelto solo la data iniziale. Il componente le scarta e commette il
valore solo a intervallo completo, perché una scrittura parziale farebbe ripartire il riallineamento
del calendario e il secondo click andrebbe perso.

Il testo digitato a mano segue una strada sua: viene interpretato solo quando la sua lunghezza
combacia con quella del formato **e** corrisponde al formato. Finché non combacia, il valore del
form non cambia — non c'è uno stato «data incompleta». Alla chiusura del calendario il componente
rilegge il testo della casella, e lì accetta anche l'anno a due cifre, provando il formato con
`yyyy` sostituito da `yy`; se non corrisponde a niente il valore viene azzerato. Nell'intervallo il
testo viene spezzato sul separatore configurato e le due metà sono valutate una per una, ciascuna
con la possibilità di risultare nulla.

La posizione della tendina è decisa prima di aprirla, confrontando lo spazio sotto la casella con
un'altezza fissa del calendario: se non ci sta, la tendina va sopra. Il calcolo viene rifatto allo
scorrimento della pagina, con un ritardo, ma solo se il calendario è visibile.

La lingua del calendario è la prima disponibile fra: l'input di forzatura, la lingua attiva del
servizio di traduzione se quel servizio è presente, la lingua del browser. Le lingue caricate sono
tre — inglese, italiano, francese — e qualunque altra ricade sull'inglese.

Il campo orario dentro al calendario viene ritoccato a mano dopo che la libreria lo ha reso: gli
input diventano di tipo numerico con due cifre e la classe del framework di stile. Poiché la
libreria può ridisegnarli, l'ascolto delle modifiche non è sui singoli input ma sulla radice del
calendario, in cattura, e viene registrato una volta sola marcando la radice con un attributo dato.

Il fuoco e la chiusura hanno diverse protezioni, tutte contro lo stesso rischio: il blur della
casella non deve chiudere il calendario mentre il mouse è dentro al calendario, e il ritorno del
fuoco alla casella dopo la chiusura avviene solo se l'utente aveva davvero interagito — altrimenti
due datepicker vicini si rimbalzano il fuoco in un ciclo mentre si naviga con Tab. Da tastiera,
Invio e Freccia giù aprono il calendario, Esc lo chiude.

Lo stato disabilitato non si limita alla casella: il componente ripassa gli input dentro al
calendario e li disabilita uno per uno, aggiungendo una classe alla radice.

Il registro delle osservazioni annota un punto di questo file: il callback `onShow` fornito
dall'esterno (`docs/automatica/osservazioni.md`).

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form,
  da cui arrivano valore, validazione, id, etichetta ed errori. Vedi
  `docs/automatica/condivisi/base-componenti.md`.
- `Traduzioni` (`projects/quang/translation/`) — iniettato in modo opzionale, serve solo a decidere
  la lingua del calendario. Vedi `docs/automatica/features/traduzioni.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per il messaggio di aiuto. Vedi
  `docs/automatica/features/tooltip.md`.

Confini esterni: `air-datepicker` fornisce il calendario e il selettore di orario, `date-fns`
formatta e interpreta le stringhe, `@jsverse/transloco` traduce etichetta, segnaposto e messaggi.

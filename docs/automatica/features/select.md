# Select

## Cosa fa

Una tendina di scelta legata a un form Angular. Non è il `<select>` del browser: è un bottone che
mostra la scelta corrente e, quando lo si apre, una lista di opzioni disegnata dalla libreria. Serve
perché le opzioni possono contenere template propri, e perché la lista si posiziona sopra o sotto il
campo secondo lo spazio disponibile.

Due modi di selezione, scelti da un input: **singola**, dove scegliere chiude la tendina, e
**multipla**, dove la tendina resta aperta e il bottone mostra le scelte separate da virgola. In
modo singolo la lista offre in testa una voce vuota, che è il modo di riportare il campo a nessuna
scelta; in modo multiplo quella voce non c'è.

Chi lo usa può sostituire il testo di un'opzione con un proprio pezzo di template, che vale sia nella
lista sia nel bottone quando l'opzione è selezionata. Le etichette passano dalla traduzione, e questo
si può disattivare con un input quando le etichette sono già testo finale.

C'è anche una scorciatoia per il caso di un'unica opzione: se richiesta, la seleziona da sé.

## Entry point

- `projects/quang/components/select/select.component.ts` — il componente `<quang-select>`,
  esportato dall'entry point secondario `quang/components/select`.
- Input propri: `selectOptions` (obbligatorio), `selectionMode` (`'single' | 'multiple'`, default
  `'single'`), `nullOption`, `translateValue`, `autoSelectSingleOption`, `optionListMaxHeight`,
  `scrollBehaviorOnOpen`. Il resto degli input arriva dalla base dei componenti di form.
- Proiezione di contenuto: lo slot `[help-icon]`, usato solo quando il messaggio di aiuto è
  configurato come tooltip.
- Il tipo dell'opzione (`SelectOption`) non è definito qui: arriva dalla base dei componenti, ed è lo
  stesso che usa l'autocomplete.

## Come funziona

Il componente estende la base dei componenti di form, si registra da sé come `NG_VALUE_ACCESSOR`, e
il valore che tiene è di un tipo o dell'altro secondo il modo: un valore singolo in modo singolo, un
array in modo multiplo. Non c'è nulla che converta fra i due se il modo cambia a campo già
compilato.

Il campo non ha un elemento di input: il bersaglio del focus è un `<button>`. Da qui vengono tre
cose che il `<select>` nativo darebbe gratis e che qui sono scritte a mano.

**L'apertura e la chiusura.** Un segnale dice se la lista è visibile, e la lista esiste nel DOM solo
mentre lo è. Il click sul bottone alterna, e non fa nulla se il campo è di sola lettura. Da tastiera,
le frecce e lo spazio e l'invio aprono la tendina se è chiusa — solo se è chiusa: a tendina aperta il
tasto non viene intercettato e passa alla lista, che è quella che muove la selezione. `Escape` chiude
e riporta il focus sul bottone.

**Il ritorno del focus.** Chiudere per selezione, per `Escape` o per `Tab` non lascia il focus dentro
un elemento che sta per sparire. Il caso della selezione e quello di `Escape` rimettono il focus sul
bottone; `Tab` chiude soltanto, e lascia che il focus prosegua dove sarebbe andato comunque.

**La chiusura per uscita del mouse.** Vale solo in modo multiplo, e sta sul contenitore esterno, non
sulla lista: in modo multiplo la selezione non chiude la tendina, e uscire col mouse è l'unico gesto
che la chiude senza toccare la tastiera.

I due comportamenti dipendenti dal modo sono ottenuti sovrascrivendo due metodi della base, e in
entrambi i casi il ramo del modo multiplo è **il ramo che non fa niente**:

- alla selezione, il modo singolo chiude la tendina e rimette il focus sul bottone; il modo multiplo
  si limita a propagare il valore;
- al blur, il modo singolo chiude la tendina e chiama il gestore della base — quello che marca il
  campo come toccato ed emette l'uscita dal campo; il modo multiplo **non chiama né l'uno né
  l'altro**.

Le scelte correnti mostrate nel bottone sono calcolate, non memorizzate a parte: si filtrano le
opzioni tenendo quelle il cui valore compare nel valore del campo, con due strade secondo che il
valore sia un array o no. Se nessuna opzione corrisponde, il bottone mostra il segnaposto.

La lista non è un figlio passivo: riceve il valore corrente, le opzioni, il modo, il riferimento al
bottone che le serve per posizionarsi e misurarsi, e restituisce la scelta, il blur e i tasti
`Escape` e `Tab` come eventi che questo componente traduce nei propri gesti. Riceve anche il tipo del
genitore, perché la stessa lista serve anche l'autocomplete e in due punti si comporta in modo
diverso secondo chi la ospita.

Nel template il riferimento `#selectButton` sta su un elemento HTML e vale quindi l'elemento nativo,
che è ciò che la lista si aspetta; il campo omonimo della classe è invece la `viewChild`, e serve al
solo ritorno del focus.

Lo stato di validità mostrato sul bordo del campo e sul bottone non passa dai segnali calcolati della
base: è ricalcolato nel template leggendo direttamente il controllo di form. Quei segnali sono usati
qui solo per nascondere il messaggio di aiuto quando c'è un errore o un successo da mostrare.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form
  e, soprattutto, la lista di opzioni `<quang-option-list>` con il tipo `SelectOption`: la lista è il
  pezzo che disegna le opzioni, le scorre da tastiera, le cerca per digitazione e si posiziona
  rispetto al campo. Vedi `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per mostrare il messaggio di aiuto in un
  tooltip. Vedi `docs/automatica/features/tooltip.md`.

Confine esterno: `@jsverse/transloco` traduce etichetta, segnaposto, etichette delle opzioni e
messaggi.

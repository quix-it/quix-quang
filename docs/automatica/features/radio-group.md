# Radio group

## Cosa fa

Un gruppo di pulsanti radio legato a un form Angular: l'utente sceglie una voce fra quelle offerte e
il form riceve il valore della voce scelta. Le voci arrivano dall'esterno come lista di oggetti, ognuno
con il proprio valore, la propria etichetta e la possibilità di essere disabilitato da solo.

Chi lo usa può sostituire il testo di una voce con un proprio pezzo di template, per voce e non per
tutto il gruppo: serve quando l'etichetta deve contenere un'icona, un prezzo, una riga di
descrizione.

Attorno al gruppo mostra le stesse cose degli altri campi della libreria: etichetta con l'asterisco
quando il campo è obbligatorio, messaggio di successo, messaggio di errore, messaggio di aiuto (in
linea oppure dentro un tooltip). Il pallino si può mettere a sinistra o a destra dell'etichetta della
voce.

## Entry point

- `projects/quang/components/radio-group/radio-group.component.ts` — il componente
  `<quang-radio-group>`, esportato dall'entry point secondario `quang/components/radio-group`.
- Input propri: `radioOptions` (obbligatorio), `name`, `radioPosition` (`'left' | 'right'`, default
  `'left'`). Il resto degli input arriva dalla base dei componenti di form.
- Proiezione di contenuto: lo slot `[help-icon]`, usato solo quando il messaggio di aiuto è
  configurato come tooltip.
- Tipi esportati: `RadioOption` (la voce: `value`, `label`, `disabled`, `renderer`), `RadioPosition`
  e `QuangRadioOptionTemplateContext`, il contesto che il template di una voce riceve.

## Come funziona

Il componente estende la base dei componenti di form e si registra da sé come `NG_VALUE_ACCESSOR`.
Da lì eredita valore, stato di validazione, id generato, gestione degli errori e blur.

Il punto che conta è **come propaga il valore**. La base offre un gestore che legge `value`
dall'elemento HTML dell'evento; qui non serve, perché il valore da propagare non è la stringa
dell'`input` radio ma il campo `value` della voce, che può essere un numero o `null`. Il componente
chiama quindi direttamente il gestore che accetta un valore già pronto, passandogli la voce scelta:
i tipi non stringa sopravvivono al giro, e `null` resta `null`.

Il valore di ritorno non è quindi mai una stringa per conto proprio: l'attributo `value` sull'elemento
HTML (`option.value ?? ''`) esiste solo per il DOM e non è quello che il form riceve.

Prima di propagare, il componente rifiuta la scelta se la voce è disabilitata. Una voce è
disabilitata se lo è il campo intero — controllo di form disabilitato o input di sola lettura — o se
lo è quella singola voce nella lista. Lo stesso controllo compare due volte: come `disabled`
sull'elemento HTML e come guardia in testa al gestore della scelta.

Il `name` che raggruppa i radio del DOM — quello che rende esclusiva la scelta — è l'input `name` se
c'è, altrimenti l'id del componente. Senza questo ripiego due gruppi sulla stessa pagina si
farebbero interferenza: l'utente ne sceglierebbe uno e l'altro si svuoterebbe.

L'etichetta di una voce si ottiene per gradi: l'etichetta dichiarata se c'è, la stringa vuota se il
valore è `null`, altrimenti il valore convertito in stringa. Quel testo passa poi dalla pipe di
traduzione, quindi un'etichetta è trattata come chiave. Se la voce porta un proprio template, il
testo non viene reso e al suo posto va il template, che riceve la voce, il suo indice e se è
selezionata.

L'id di ogni `input` radio è derivato dall'id del componente più l'indice nella lista, e la `label`
della voce lo referenzia: cliccare l'etichetta seleziona la voce.

Il gruppo è marcato per l'accessibilità in due modi insieme: il contenitore delle voci dichiara il
ruolo `radiogroup` e punta all'etichetta del gruppo, che è resa come `legend` dentro un `fieldset`.

La struttura del template non è condivisa con gli altri campi: etichetta, messaggi di errore, di
successo e di aiuto sono scritti qui, non ereditati da un contenitore comune. Sono le stesse classi
degli altri componenti, ma sono un'altra copia.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form,
  da cui arrivano valore, validazione, id, etichetta, errori e il gestore del blur. Vedi
  `docs/automatica/condivisi/base-componenti.md`.
- `Tooltip` (`projects/quang/overlay/tooltip/`) — usato solo per mostrare il messaggio di aiuto in un
  tooltip. Vedi `docs/automatica/features/tooltip.md`.

Confine esterno: `@jsverse/transloco` traduce etichetta del gruppo, etichette delle voci e messaggi.

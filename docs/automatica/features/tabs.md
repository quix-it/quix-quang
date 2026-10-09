# Tabs

## Cosa fa

Una striscia di linguette che si lega a un form Angular: il valore del campo è **l'id della linguetta
scelta**, una stringa. Chi lo usa passa l'elenco delle linguette — id, etichetta, eventuale stato
disabilitato — e riceve la scelta sia attraverso il `FormControl` sia con un evento.

**Non mostra il contenuto della linguetta.** Il componente disegna solo la striscia e dice quale è
attiva; quale pannello far vedere sotto lo decide chi lo usa, leggendo il valore del form o l'evento.

La striscia si dispone in orizzontale o in verticale.

## Entry point

- `projects/quang/components/tabs/tabs.component.ts` — il componente `<quang-tabs>`, esportato
  dall'entry point secondario `quang/components/tabs`.
- Input: `tabs` (obbligatorio, l'elenco delle `TabConfiguration`), `tabsOrientation`
  (`horizontal` o `vertical`, default orizzontale).
- Output: `tabChange` con l'id della linguetta scelta.
- Si registra come `NG_VALUE_ACCESSOR`, quindi funziona con `formControlName`, `formControl` e
  `ngModel` come gli altri campi della libreria.
- Tipi esportati: `TabConfiguration` e l'enum `TabsOrientation`.

## Come funziona

Estende la base dei componenti di form con valore di tipo stringa. Il valore corrente è l'id, e la
linguetta attiva è semplicemente quella il cui id coincide: non esiste un indice selezionato, e
l'ordine dell'elenco non conta per la selezione.

Una linguetta è disabilitata se lo dice la sua configurazione, **oppure** se lo è l'intero
componente — perché il controllo di form è disabilitato o perché è in sola lettura. Le tre condizioni
sono in `or`, quindi in sola lettura la striscia intera diventa non cliccabile.

Il click, se la linguetta non è disabilitata, fa due cose: passa l'id al gestore della base — che
scrive il valore, notifica il form e marca il campo come toccato — e poi emette `tabChange`. Le due
strade portano lo stesso id, e chi usa il componente può prendere quella che preferisce.

Una linguetta può portare un `renderer`: in quel caso il bottone di default non viene disegnato e al
suo posto va il template di chi usa il componente, che riceve quattro cose — la configurazione della
linguetta come valore implicito, se è selezionata, la sua posizione nell'elenco, e **la funzione di
selezione stessa**, già legata al componente. Un template personalizzato deve quindi chiamare quella
funzione per far cambiare il valore: il click su un elemento disegnato da fuori non passa da nessun
gestore del componente.

Senza `renderer` il bottone di default mostra l'etichetta tradotta, porta l'attributo `disabled`
quando serve, e distingue quella attiva con una classe.

## Dipende da

- `Base dei componenti` (`projects/quang/components/shared/`) — la classe base del controllo di form,
  da cui arrivano il valore, lo stato di disabilitazione, la marcatura del campo come toccato e la
  registrazione presso il form. Vedi `docs/automatica/condivisi/base-componenti.md`.

Confine esterno: `@jsverse/transloco` traduce le etichette delle linguette.

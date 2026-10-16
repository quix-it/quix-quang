# Form e validatori

## Cosa fa

Due cose senza dipendenze fra loro, tenute insieme dall'entry point.

La prima è una raccolta di validatori pronti per i form Angular, su tre temi: gli allegati (misura,
tipo, estensione, «è davvero un file»), le date (minimo, massimo, intervallo) e alcuni formati
italiani ed europei (codice fiscale, partita IVA), più due casi particolari della libreria — la
casella di spunta obbligatoria e il campo wysiwyg obbligatorio, che hanno bisogno di un validatore
proprio perché il loro valore vuoto non è la stringa vuota.

La seconda è un tipo di supporto, `FormGroupModel<T>`, per dichiarare un `FormGroup` tipato a partire
da un'interfaccia invece di ripetere i tipi controllo per controllo.

## Entry point

- `projects/quang/forms/index.ts` — l'entry point secondario `quang/forms`, che riesporta i due
  moduli interi. Non esistono `ng-package.json` per i sottopath: `quang/forms` è l'unico entry point
  pubblicato di quest'area.
- `projects/quang/forms/validators.ts` — tredici funzioni che restituiscono un validatore, più
  l'enum `EuroLocale` (27 stati) e la mappa `europeanVatNumber` da locale a espressione regolare,
  entrambe esportate e quindi utilizzabili anche da fuori.
- `projects/quang/forms/form-group-model.ts` — il solo tipo `FormGroupModel<T>`, con un esempio
  d'uso nel commento.

## Come funziona

Ogni validatore è una funzione che prende i suoi parametri e restituisce la funzione che Angular
chiamerà: `(control) => ValidationErrors | null`. Nessuno di essi ha stato proprio, con l'eccezione
descritta più sotto sulla mappa delle partite IVA.

### La regola che cambia da validatore a validatore: il valore vuoto

Non c'è un contratto unico, ed è la cosa da sapere prima di comporre questi validatori con
`Validators.required`.

Un gruppo controlla `control.value` prima di giudicare, e quindi considera **valido** il campo vuoto,
lasciando l'obbligatorietà a `Validators.required`: `fileMaxSize`, `fileMinSize`, `fileType`,
`fileExtensions`, `isFiscalCode`.

Un altro gruppo giudica anche il vuoto, e quindi **è** già un vincolo di obbligatorietà: `isFile`
(nessun valore non è un file), `requiredCheckbox` e `wysiwygRequired` — che è il loro scopo — ma
anche `isVatNumber`, `minDate`, `maxDate` e `dateBetween`, dove non sembra intenzionale. I tre
validatori di data passano il valore a `new Date(...)` senza guardia: con un controllo vuoto a `null`
la conversione dà il 1° gennaio 1970, che è prima di qualunque data di confronto realistica, e
`minDate` segnala errore su un campo che l'utente non ha ancora compilato.

### Gli allegati

`fileMaxSize` e `fileMinSize` confrontano `size` e richiedono `instanceof File`: un valore che non è
un `File` passa senza segnalazione. `isFile` fa il contrario e pretende che lo sia.

`fileType` confronta `control.value?.type` con la lista, quindi ragiona sul MIME type dichiarato dal
browser, non sul contenuto.

`fileExtensions` ricava l'estensione dal nome con `name?.match(/(?:\.([^.]+))?$/g)`, e il risultato
di quel match **include il punto**: la lista da passare va scritta `['.pdf', '.docx']`, non
`['pdf', 'docx']`. A differenza dei due validatori di misura non verifica `instanceof File`.

### I formati

`isFiscalCode` accetta due forme alternative: il codice fiscale di persona fisica di sedici caratteri
o undici cifre — la partita IVA usata come codice fiscale di un'azienda. Il confronto è fatto su
`control.value.toUpperCase()`, quindi il minuscolo passa.

`isVatNumber` prende una lista di `EuroLocale` e scorre le espressioni della mappa fermandosi al
primo esito positivo: un valore è accettato se è una partita IVA valida per **almeno uno** dei locale
richiesti. In caso negativo l'errore emesso è `{ vatNumber: false }` — è la presenza della chiave a
segnalare l'errore ad Angular, il valore `false` non lo annulla.

Le espressioni della mappa `europeanVatNumber` sono costanti di modulo, create una volta sola al
caricamento, e portano il flag `g`. `isVatNumber` le usa con `.test()`, che su una regex con quel
flag riparte da `lastIndex` e lo aggiorna a ogni chiamata: le chiamate successive sullo stesso locale
non partono dall'inizio della stringa.

### I due casi della libreria

`requiredCheckbox` segnala quando il valore è falsy, ed emette la chiave `required` di Angular:
serve perché una casella non spuntata vale `false`, che `Validators.required` tratta come valore
mancante solo in parte.

`wysiwygRequired` toglie tutti i tag HTML dal valore e chiede che resti almeno un carattere: un
contenuto fatto di soli tag — quello che un editor ricco produce quando l'utente cancella il testo ma
non la formattazione — è considerato vuoto. Emette anch'esso la chiave `required`.

### Le chiavi di errore

Sono quelle da mettere nell'`errorMap` dei componenti della libreria: `maxSize`, `minSize`, `isFile`,
`fileType`, `fileExtension` (singolare, benché la funzione sia `fileExtensions`), `required`,
`minDate`, `maxDate`, `dateBetween`, `fiscalCode`, `vatNumber`. Tre validatori — `requiredCheckbox`,
`wysiwygRequired` e `Validators.required` di Angular — condividono la stessa chiave `required`, e
nell'`errorMap` non sono quindi distinguibili.

### Il tipo del form

`FormGroupModel<T>` è un `FormGroup` i cui controlli sono la mappatura di ogni proprietà di `T` su un
`FormControl<T[K]>`. Nessun codice a runtime: serve a far controllare al compilatore che i controlli
dichiarati nel `formBuilder.group({...})` corrispondano all'interfaccia, nome per nome e tipo per
tipo.

## Dipende da

Nessun condiviso della libreria: quest'area non importa niente da dentro `projects/quang/`. La
relazione con i componenti va nell'altro senso — sono loro a consumare le chiavi di errore prodotte
qui, attraverso il proprio input `errorMap`.

Confini esterni:

- `@angular/forms` — i tipi `AbstractControl`, `ValidationErrors`, `ValidatorFn`, `FormControl`,
  `FormGroup`. Solo tipi: nessuna classe di Angular viene istanziata.
- `date-fns` — `isBefore`, `isAfter`, `isWithinInterval` per i tre validatori di data.

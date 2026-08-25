# Indice Componenti UI Quang

Benvenuto nella libreria dei componenti UI Quang! Di seguito trovi l'elenco di tutti i componenti disponibili in questa cartella, con link alla documentazione dettagliata.

## Documentazione dei Componenti

- [Componente Autocomplete](./autocomplete/README-it.md): Fornisce suggerimenti in tempo reale mentre l'utente digita, permettendo una selezione rapida da una lista di opzioni filtrate.
- [Componente Checkbox/Toggle](./checkbox/README-it.md): Può essere usato come checkbox standard o come interruttore toggle tramite l'input `checkType`.
- [Componente Datepicker](./date/README-it.md): Un datepicker personalizzabile basato su Air Datepicker.
- [Componente Input](./input/README-it.md): Campo di input configurabile che supporta vari tipi come testo, password, email e altro.
- [Componente Paginatore](./paginator/README-it.md): Fornisce controlli per la navigazione tra pagine di dati.
- [Componente Select](./select/README-it.md): Supporta selezione singola o multipla da un elenco a discesa.
- [Componente Tabella](./table/README-it.md): Consente la visualizzazione di dati in formato tabellare.
- [Componente WYSIWYG](./wysiwyg/README-it.md): Editor di testo ricco basato su SunEditor, con numerose opzioni di formattazione.

## Note

La maggior parte dei componenti è stilizzata su Bootstrap v5.3 ed estende [`QuangBaseComponent`](./shared/quang-base-component.directive.ts), che fornisce funzionalità comuni come etichette, messaggi di errore e altro. Alcuni componenti, come il paginatore, non estendono questa base: consulta la documentazione di ciascun componente per i dettagli.

Per gli stili globali, ricorda di includere i file SCSS necessari come indicato nella documentazione dei singoli componenti.

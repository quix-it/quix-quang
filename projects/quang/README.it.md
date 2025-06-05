# Quang

Quang è una libreria completa di componenti e utility per Angular progettata per semplificare le operazioni comuni nelle applicazioni Angular.

## Struttura del Progetto

La libreria è organizzata in diversi moduli funzionali, ognuno focalizzato su un aspetto specifico dello sviluppo applicativo:

### [Auth](/projects/quang/auth/README.md)
Utilità per autenticazione e autorizzazione tra cui:
- Servizi e provider di autenticazione
- Direttive per il controllo degli accessi basato sui ruoli
- Guardie di autenticazione
- Gestione dello storage dei token
- Funzionalità di autenticazione specifiche per mobile

### [Componenti](/projects/quang/components/README.md)
Componenti UI riutilizzabili tra cui:
- Autocomplete
- Checkbox
- Input data
- Input form
- Paginatore
- Select dropdown
- Tabelle
- Editor WYSIWYG

### [Gestione Dati](/projects/quang/data-handling)
Utility per:
- Operazioni di conversione dati
- Helper per il download di file

### [Device](/projects/quang/device)
Utility per la gestione del dispositivo e del viewport tra cui:
- Servizio di osservazione del resize per il design responsivo

### [Form](/projects/quang/forms/README.md)
Utility per la gestione dei form tra cui:
- Astrazioni per form group model
- Validator personalizzati

### [Loader](/projects/quang/loader/README.md)
Gestione dello stato di caricamento tra cui:
- Componenti indicatore di caricamento
- Interceptor per lo stato di caricamento
- Servizio di caricamento

### [Network](/projects/quang/network)
Utility e servizi per le richieste di rete.
- Utility per interceptor

### [Overlay](/projects/quang/overlay/README.md)
Componenti UI basati su overlay tra cui:
- Modali
- Popover
- Toast
- Tooltip

### [Traduzione](/projects/quang/translation/README.md)
Utility per l'internazionalizzazione (i18n) tra cui:
- Servizio di caricamento delle traduzioni
- Provider di traduzione
- Token di traduzione

## Per Iniziare

Per usare Quang nel tuo progetto, installalo tramite npm:

```bash
npm install quang
```

## Utilizzo

Quang utilizza componenti standalone, il che significa che puoi importare solo i componenti specifici di cui hai bisogno direttamente nella tua applicazione:

```typescript
// Importa servizi
import { AuthService } from 'quang/auth';
import { LoaderService } from 'quang/loader';

// Importa componenti
import { SelectComponent } from 'quang/components/select';
import { PaginatorComponent } from 'quang/components/paginator';
import { LoaderComponent } from 'quang/loader';

// Importa direttive
import { IsAuthenticatedDirective } from 'quang/auth';
```

Puoi quindi utilizzare questi componenti direttamente nei tuoi componenti standalone:

```typescript
@Component({
  standalone: true,
  imports: [SelectComponent, PaginatorComponent, LoaderComponent, IsAuthenticatedDirective],
  // ...
})
export class YourComponent {
  // ...
}
```

Per informazioni più dettagliate su ciascun componente e funzionalità, consulta il README corrispondente collegato nella sezione struttura del progetto.

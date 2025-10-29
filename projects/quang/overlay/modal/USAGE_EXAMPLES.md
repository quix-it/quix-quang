# Esempi di Utilizzo - Modal Service

## Gestione delle informazioni di ritorno dalla modale

Il `QuangModalService` permette di ottenere informazioni di ritorno dalla modale, ad esempio per discriminare quale pulsante è stato cliccato. Esistono due approcci:

### 1. Approccio Semplificato con ModalRef (Raccomandato)

Il componente modale può iniettare `ModalRef` per chiudersi facilmente e passare dati.

#### Componente Modale

```typescript
import { Component, inject } from '@angular/core';
import { ModalRef } from '@quang/overlay/modal';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-content">
      <h2>Conferma Azione</h2>
      <p>Sei sicuro di voler procedere?</p>
      <div class="buttons">
        <button (click)="onConfirm()">Conferma</button>
        <button (click)="onCancel()">Annulla</button>
        <button (click)="onLater()">Più tardi</button>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  private modalRef = inject(ModalRef);

  onConfirm() {
    // Chiudi la modale passando quale pulsante è stato cliccato
    this.modalRef.close({ action: 'confirm', timestamp: Date.now() });
  }

  onCancel() {
    this.modalRef.close({ action: 'cancel' });
  }

  onLater() {
    this.modalRef.close({ action: 'later' });
  }
}
```

#### Componente Chiamante

```typescript
import { Component, inject } from '@angular/core';
import { QuangModalService } from '@quang/overlay/modal';
import { ConfirmModalComponent } from './confirm-modal.component';

@Component({
  selector: 'app-example',
  template: `<button (click)="openConfirmModal()">Apri Modale</button>`
})
export class ExampleComponent {
  private modalService = inject(QuangModalService);

  openConfirmModal() {
    this.modalService.showModal(
      ConfirmModalComponent,
      { position: 'center', width: '400px' }
    ).subscribe({
      next: (result) => {
        if (result) {
          const action = (result as { action: string }).action;
          
          switch (action) {
            case 'confirm':
              console.log('Utente ha confermato');
              this.performAction();
              break;
            case 'cancel':
              console.log('Utente ha annullato');
              break;
            case 'later':
              console.log('Utente ha rimandato');
              this.scheduleForLater();
              break;
          }
        } else {
          console.log('Modale chiusa senza azione (backdrop click)');
        }
      }
    });
  }

  private performAction() {
    // Logica azione confermata
  }

  private scheduleForLater() {
    // Logica rimanda azione
  }
}
```

### 2. Esempio con Form e Validazione

```typescript
interface FormResult {
  action: 'submit' | 'cancel' | 'draft';
  data?: {
    name: string;
    email: string;
  };
  validationErrors?: string[];
}

@Component({
  selector: 'app-form-modal',
  template: `
    <form>
      <input [(ngModel)]="formData.name" name="name" placeholder="Nome" />
      <input [(ngModel)]="formData.email" name="email" placeholder="Email" />
      
      <div class="buttons">
        <button type="button" (click)="onSubmit()">Invia</button>
        <button type="button" (click)="onSaveDraft()">Salva Bozza</button>
        <button type="button" (click)="onCancel()">Annulla</button>
      </div>
    </form>
  `
})
export class FormModalComponent {
  private modalRef = inject(ModalRef);

  formData = {
    name: '',
    email: ''
  };

  onSubmit() {
    const errors = this.validate();
    
    if (errors.length === 0) {
      this.modalRef.close({
        action: 'submit',
        data: this.formData
      } as FormResult);
    } else {
      this.modalRef.close({
        action: 'submit',
        validationErrors: errors
      } as FormResult);
    }
  }

  onSaveDraft() {
    this.modalRef.close({
      action: 'draft',
      data: this.formData
    } as FormResult);
  }

  onCancel() {
    this.modalRef.close({ action: 'cancel' } as FormResult);
  }

  private validate(): string[] {
    const errors: string[] = [];
    if (!this.formData.name) errors.push('Nome obbligatorio');
    if (!this.formData.email) errors.push('Email obbligatoria');
    return errors;
  }
}
```

```typescript
@Component({
  selector: 'app-caller'
})
export class CallerComponent {
  private modalService = inject(QuangModalService);

  openFormModal() {
    this.modalService.showModal(
      FormModalComponent,
      { position: 'center' }
    ).subscribe({
      next: (result) => {
        if (!result) return;
        
        const formResult = result as FormResult;
        
        switch (formResult.action) {
          case 'submit':
            if (formResult.validationErrors?.length) {
              console.error('Errori validazione:', formResult.validationErrors);
            } else if (formResult.data) {
              console.log('Form inviato:', formResult.data);
              this.submitForm(formResult.data);
            }
            break;
            
          case 'draft':
            if (formResult.data) {
              console.log('Bozza salvata:', formResult.data);
              this.saveDraft(formResult.data);
            }
            break;
            
          case 'cancel':
            console.log('Form annullato');
            break;
        }
      }
    });
  }

  private submitForm(data: any) { /* ... */ }
  private saveDraft(data: any) { /* ... */ }
}
```

### 3. Approccio Diretto (Alternativo)

Se preferisci non usare `ModalRef`, puoi comunque usare direttamente il servizio.

```typescript
@Component({
  selector: 'app-direct-modal'
})
export class DirectModalComponent {
  private modalService = inject(QuangModalService);
  modalId!: string;  // Deve essere passato come input

  onClose() {
    this.modalService.close(this.modalId, { result: 'closed' });
  }
}
```

## Apertura modale con subscription ai dati di chiusura

Il servizio modale ora restituisce un `Observable<object | undefined>` che permette di ricevere dati quando la modale viene chiusa.

### Esempio Base

```typescript
import { Component, inject } from '@angular/core';
import { QuangModalService } from '@quang/overlay/modal';
import { MyModalComponent } from './my-modal.component';

@Component({
  selector: 'app-example',
  template: `<button (click)="openModal()">Apri Modale</button>`
})
export class ExampleComponent {
  private modalService = inject(QuangModalService);

  openModal() {
    const modalRef$ = this.modalService.showModal(
      MyModalComponent,
      {
        position: 'center',
        width: '500px',
        showBackdrop: true
      }
    );

    modalRef$.subscribe({
      next: (data) => {
        if (data) {
          console.log('Modale chiusa con dati:', data);
          // Elabora i dati ricevuti
        } else {
          console.log('Modale chiusa senza dati');
        }
      },
      complete: () => {
        console.log('Observable completato');
      }
    });
  }
}
```

### Esempio con TypeScript Tipizzato

```typescript
interface FormData {
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-typed-example',
  template: `<button (click)="openFormModal()">Apri Form</button>`
})
export class TypedExampleComponent {
  private modalService = inject(QuangModalService);

  openFormModal() {
    this.modalService.showModal(
      FormModalComponent,
      { position: 'center' }
    ).subscribe({
      next: (data) => {
        if (data) {
          const formData = data as FormData;
          console.log('Dati form:', formData);
          // Usa i dati tipizzati
          this.saveUser(formData);
        }
      }
    });
  }

  private saveUser(data: FormData) {
    // Logica di salvataggio
  }
}
```

### Chiusura della modale con dati

All'interno del componente modale, puoi chiudere la modale passando dati:

```typescript
import { Component, inject } from '@angular/core';
import { QuangModalService } from '@quang/overlay/modal';

@Component({
  selector: 'app-form-modal',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="formData.name" name="name" />
      <input [(ngModel)]="formData.email" name="email" />
      <button type="submit">Salva</button>
      <button type="button" (click)="onCancel()">Annulla</button>
    </form>
  `
})
export class FormModalComponent {
  private modalService = inject(QuangModalService);
  private modalId!: string;

  formData = {
    name: '',
    email: '',
    age: 0
  };

  onSubmit() {
    // Chiudi la modale passando i dati del form
    this.modalService.close(this.modalId, this.formData);
  }

  onCancel() {
    // Chiudi la modale senza passare dati
    this.modalService.close(this.modalId);
  }
}
```

### Esempio con RxJS Operators

```typescript
import { take, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-advanced-example'
})
export class AdvancedExampleComponent {
  private modalService = inject(QuangModalService);

  openModalWithOperators() {
    this.modalService.showModal(
      ConfirmModalComponent,
      { position: 'center' }
    ).pipe(
      take(1), // Prendi solo il primo valore
      filter(data => data !== undefined), // Filtra solo se ci sono dati
      map(data => (data as { confirmed: boolean }).confirmed)
    ).subscribe({
      next: (confirmed) => {
        if (confirmed) {
          console.log('Azione confermata');
          this.performAction();
        }
      }
    });
  }

  private performAction() {
    // Esegui l'azione confermata
  }
}
```

### Esempio con Multiple Modali in Sequenza

```typescript
@Component({
  selector: 'app-sequence-example'
})
export class SequenceExampleComponent {
  private modalService = inject(QuangModalService);

  openModalSequence() {
    // Prima modale
    this.modalService.showModal(
      FirstModalComponent,
      { position: 'center' }
    ).subscribe({
      next: (firstData) => {
        if (firstData) {
          // Apri seconda modale con i dati della prima
          this.modalService.showModal(
            SecondModalComponent,
            { position: 'center' },
            { previousData: firstData }
          ).subscribe({
            next: (secondData) => {
              if (secondData) {
                console.log('Dati finali:', { firstData, secondData });
              }
            }
          });
        }
      }
    });
  }
}
```

## Note Importanti

1. **Gestione della Subscription**: La subscription viene completata automaticamente quando la modale viene chiusa, sia con `close()` che con `hideModal()`.

2. **Dati Undefined**: Se la modale viene chiusa senza passare dati (es. cliccando sul backdrop o chiamando `close()` senza parametri), l'observable emetterà `undefined`.

3. **Type Safety**: Per ottenere type safety sui dati ritornati, usa il type casting o definisci interfacce specifiche.

4. **Memory Leaks**: Il Subject viene completato automaticamente, quindi non ci sono rischi di memory leak.

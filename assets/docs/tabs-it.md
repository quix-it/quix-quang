# Componente QuangTabsComponent

Il `QuangTabsComponent` è un componente di navigazione a tab flessibile che fornisce cambio fluido tra le tab, supporto per stati disabilitati, template personalizzati e integrazione completa con i form reattivi Angular. Supporta sia tab standard che tab con rendering personalizzato con opzioni di personalizzazione estese.

## Input

- `tabs`: `TabConfiguration[]` — Array di configurazioni delle tab. Ogni tab deve avere un `id` e una `label`, e può opzionalmente includere lo stato `disabled` o un `renderer` personalizzato. **(Obbligatorio)**
- `isReadonly`: `boolean` — Imposta il componente in modalità sola lettura. Quando true, tutte le tab diventano non interattive. Ereditato da `QuangBaseComponent`
- `componentTabIndex`: `number` — Indice tab per accessibilità. Ereditato da `QuangBaseComponent`
- `componentClass`: `string | string[]` — Classi CSS aggiuntive. Ereditato da `QuangBaseComponent`
- `formControl`: `FormControl` — Controllo form per form reattivi. Ereditato da `QuangBaseComponent`

## Output

- `tabChange`: `EventEmitter<string>` — Emesso quando la tab selezionata cambia. Fornisce l'`id` della tab appena selezionata
- `componentBlur`: `EventEmitter<void>` — Emesso quando il componente perde il focus. Ereditato da `QuangBaseComponent`

## Interfaccia TabConfiguration

```typescript
interface TabConfiguration {
  id: string              // Identificatore univoco per la tab
  label: string          // Chiave di traduzione o testo dell'etichetta
  disabled?: boolean     // Se true, la tab è disabilitata e non interattiva
  renderer?: TemplateRef<any>  // Template personalizzato opzionale per il rendering della tab
}
```

## Utilizzo

### Tab Base

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('home')

  tabs: TabConfiguration[] = [
    { id: 'home', label: 'navigation.home' },
    { id: 'profile', label: 'navigation.profile' },
    { id: 'settings', label: 'navigation.settings' },
  ]
}
```

### Tab con Stato Disabilitato

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('tab1')

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Tab Abilitata' },
    { id: 'tab2', label: 'Tab Disabilitata', disabled: true },
    { id: 'tab3', label: 'Altra Tab' },
  ]
}
```

### Gestione Eventi

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
  (tabChange)="onTabChange($event)"
/>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Panoramica' },
    { id: 'details', label: 'Dettagli' },
    { id: 'analytics', label: 'Analisi' },
  ]

  onTabChange(tabId: string): void {
    console.log('Tab selezionata:', tabId)
    // Gestisci la logica del cambio tab
  }
}
```

### Cambio Contenuto Tab

Visualizza contenuti diversi in base alla tab selezionata usando il controllo di flusso `@switch` di Angular:

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>

<!-- Il contenuto cambia in base alla tab selezionata -->
<div class="mt-4">
  @switch (selectedTab.value) {
    @case ('overview') {
      <div class="card">
        <div class="card-header">
          <h5>Panoramica</h5>
        </div>
        <div class="card-body">
          <p>Benvenuto nella sezione panoramica!</p>
          <ul>
            <li>Statistiche rapide</li>
            <li>Attività recenti</li>
          </ul>
        </div>
      </div>
    }
    @case ('details') {
      <div class="card">
        <div class="card-header">
          <h5>Dettagli</h5>
        </div>
        <div class="card-body">
          <table class="table">
            <tbody>
              <tr>
                <td><strong>Nome:</strong></td>
                <td>Mario Rossi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    }
    @case ('settings') {
      <div class="card">
        <div class="card-header">
          <h5>Impostazioni</h5>
        </div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label>Tema</label>
              <select class="form-select">
                <option>Chiaro</option>
                <option>Scuro</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Salva
            </button>
          </form>
        </div>
      </div>
    }
  }
</div>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('overview')

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Panoramica' },
    { id: 'details', label: 'Dettagli' },
    { id: 'settings', label: 'Impostazioni' },
  ]
}
```

### Template Personalizzati per le Tab

```html
<ng-template
  #customTabTpl
  let-tab
  let-selected="selected"
>
  <button
    [class.selected]="selected"
    class="flex-grow-1 btn btn-only-text custom-tab"
    type="button"
  >
    <span class="d-flex gap-2 align-items-center justify-content-center">
      <span>{{ tab.icon }}</span>
      <strong>{{ tab.label | transloco }}</strong>
      @if(selected) {
        <small class="badge bg-primary">Attiva</small>
      }
    </span>
  </button>
</ng-template>

<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
/>
```

```typescript
export class MyComponent {
  private readonly customTabTpl = viewChild<TemplateRef<any>>('customTabTpl')
  selectedTab = new FormControl<string>('dashboard')

  get tabs(): TabConfiguration[] {
    return [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        renderer: this.customTabTpl() 
      },
      { 
        id: 'messages', 
        label: 'Messaggi', 
        renderer: this.customTabTpl() 
      },
    ]
  }
}
```

### Integrazione Form con Validazione

```html
<form [formGroup]="form">
  <quang-tabs
    [tabs]="tabs"
    formControlName="selectedSection"
  />
</form>
```

```typescript
export class MyComponent {

  form = this.fb.group({
    selectedSection: [null, Validators.required]
  })

  tabs: TabConfiguration[] = [
    { id: 'section1', label: 'Sezione 1' },
    { id: 'section2', label: 'Sezione 2' },
    { id: 'section3', label: 'Sezione 3' },
  ]
}
```

### Modalità Sola Lettura

```html
<quang-tabs
  [tabs]="tabs"
  [formControl]="selectedTab"
  [isReadonly]="isReadonly()"
/>

<button (click)="toggleReadonly()">
  Attiva/Disattiva Sola Lettura
</button>
```

```typescript
export class MyComponent {
  selectedTab = new FormControl<string>('tab1')
  isReadonly = signal<boolean>(false)

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }
}
```

## Integrazione Traduzione

Il componente usa QuangTranslationService per tutto il contenuto testuale:

- **Traduzione Automatica**: Tutte le etichette delle tab e i messaggi sono tradotti automaticamente usando Transloco
- **Supporto Chiavi**: Usa chiavi di traduzione per le etichette delle tab per supporto multi-lingua
- **Gestione Fallback**: Fornisce fallback elegante quando le traduzioni non sono disponibili
- **Lingua Dinamica**: Risponde ai cambi di lingua senza ricaricare il componente

## Contesto Template Personalizzato

Quando si usano template personalizzati, è disponibile il seguente contesto:

```typescript
interface QuangTabTemplateContext {
  $implicit: TabConfiguration  // L'oggetto di configurazione della tab
  selected: boolean           // Se questa tab è attualmente selezionata
  index: number              // L'indice della tab nell'array
}
```

Esempio di utilizzo nel template:

```html
<ng-template
  #tabTpl
  let-tab
  let-selected="selected"
  let-index="index"
>
  <!-- tab: TabConfiguration -->
  <!-- selected: boolean -->
  <!-- index: number -->
  <div>{{ tab.label }} - Posizione {{ index + 1 }}</div>
</ng-template>
```

## Stile

Il componente usa le classi Bootstrap 5.3 per lo stile. Le tab predefinite hanno:
- Bordo inferiore che diventa più spesso (4px) quando selezionato
- Transizioni fluide sui cambiamenti di stato
- Stato disabilitato con opacità ridotta
- Effetti hover sulle tab interattive

Puoi personalizzare lo stile usando l'input `componentClass` o targetizzando le classi CSS del componente.

## Note

- Estende `QuangBaseComponent` per comportamento coerente tra tutti i componenti Quang
- Supporta i form reattivi Angular con `ControlValueAccessor`
- Completamente compatibile con la validazione form di Angular
- Stilizzato basandosi su Bootstrap v5.3
- Supporta sia chiavi di traduzione che testo diretto per le etichette
- Le singole tab possono essere disabilitate indipendentemente dallo stato del form control

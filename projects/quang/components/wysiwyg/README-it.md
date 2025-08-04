# Componente QuangWysiwyg

Il `QuangWysiwygComponent` è un editor di testo ricco basato su [SunEditor](https://github.com/JiHong88/SunEditor), che offre una vasta gamma di opzioni di formattazione per la creazione e la modifica di contenuti HTML.


## Input

- `wysiwygOptions`: `object` — Opzioni di configurazione per l'editor (obbligatorio)
- `minHeight`: `string | undefined` — Altezza minima dell'area editor (default: '200px')
- `highlightColor`: `boolean` — Mostra/nasconde il pulsante colore evidenziatore nella toolbar (default: true)
- `isReadonly`: `boolean` — Se true, l'editor è di sola lettura
- `onImageUploadError`: `(errorMessage: any, result: any, core: any) => boolean` — Callback per errori di upload immagini
- `onFileDrop`: `(e: any, cleanData: any, maxCharCount: any, core: any) => boolean` — Callback per eventi di trascinamento file
- Toggle dei pulsanti della toolbar (tutti `boolean`, default: `true`): `font`, `fontSize`, `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`, `fontColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`, `image`, `fullScreen`, `showBlocks`

Tutti gli input standard ereditati da `QuangBaseComponent`:
- `componentLabel`: `string` — Etichetta (supporta chiavi i18n)
- `componentPlaceholder`: `string` — Placeholder (supporta chiavi i18n)
- `componentTabIndex`: `number` — Indice tab per accessibilità
- `componentClass`: `string` — Classi CSS aggiuntive
- `errorMap`: `ErrorData[]` — Messaggi errore validazione
- `successMessage`: `string` — Messaggio di successo
- `helpMessage`: `string` — Messaggio di aiuto visualizzato sotto l'editor
- `helpMessageTooltip`: `boolean` — Se true, mostra il messaggio di aiuto come tooltip (con icona proiettata); se false, mostra il messaggio inline sotto l'editor. Default: `false`
- `formControl`: `FormControl` — Controllo form reattivo Angular


## Output

- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`: emesso quando l'editor perde il focus


## Utilizzo

### Editor Base
```html
<quang-wysiwyg
  [errorMap]="errors()"
  [highlightColor]="highlightColor()"
  [isReadonly]="isReadonly()"
  [minHeight]="wysiwygHeight()"
  [onImageUploadError]="onImageUploadError"
  [wysiwygOptions]="wysiwygOptions"
  componentLabel="form.label.wysiwyg"
  formControlName="testInput"
  successMessage="form.label.success"
/>
```

### Messaggio di Aiuto Inline
```html
<quang-wysiwyg
  [wysiwygOptions]="wysiwygOptions"
  componentLabel="form.label.wysiwyg"
  helpMessage="form.help.wysiwyg"
  [helpMessageTooltip]="false"
  formControlName="testInput"
/>
```

### Messaggio di Aiuto Tooltip
```html
<quang-wysiwyg
  [wysiwygOptions]="wysiwygOptions"
  componentLabel="form.label.wysiwyg"
  helpMessage="form.help.wysiwyg"
  [helpMessageTooltip]="true"
  formControlName="testInput"
>
  <span help-icon class="ms-1"><i class="fas fa-question-circle"></i></span>
</quang-wysiwyg>
```

### Nota

Ricordati di importare:
`node_modules/quang/components/wysiwyg/global-wysiswyg.component.scss`
oppure
`quang/components/wysiwyg/global-wysiswyg.component.scss`
nel tuo stile globale (consigliata la cartella "vendors").

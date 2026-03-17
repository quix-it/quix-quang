# Componente QuangWysiwyg

Il `QuangWysiwygComponent` è un editor di testo ricco basato su [SunEditor](https://github.com/JiHong88/SunEditor), che offre una vasta gamma di opzioni di formattazione per la creazione e la modifica di contenuti HTML.

## Input

- `wysiwygOptions`: `object` - Opzioni di configurazione per l'editor (obbligatorio)
- `minHeight`: `string | undefined` - Altezza minima dell'area editor (default: '200px')
- `highlightColor`: `boolean` - Mostra/nasconde il pulsante colore evidenziatore nella toolbar (default: true)
- `isReadonly`: `boolean` - Se true, l'editor è di sola lettura
- `onImageUploadError`: `(errorMessage: any, result: any, core: any) => boolean` - Callback per errori di upload immagini
- `onFileDrop`: `(e: any, cleanData: any, maxCharCount: any, core: any) => boolean` - Callback per eventi di trascinamento file
- Toggle dei pulsanti della toolbar (tutti `boolean`, default: `true`): `font`, `fontSize`, `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`, `fontColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`, `image`, `fullScreen`, `showBlocks`

Tutti gli input standard ereditati da `QuangBaseComponent`: `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

Tutti gli output standard ereditati da `QuangBaseComponent`: `componentBlur`

## Utilizzo

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

### Nota

Ricordati di importare:
`node_modules/quang/components/wysiwyg/global-wysiswyg.component.scss`
oppure
`quang/components/wysiwyg/global-wysiswyg.component.scss`
nel tuo stile globale (consigliata la cartella "vendors").

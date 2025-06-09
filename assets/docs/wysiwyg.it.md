# Componente QuangWysiwyg

Il `QuangWysiwygComponent` è un editor di testo ricco basato su [SunEditor](https://github.com/JiHong88/SunEditor), che offre una vasta gamma di opzioni di formattazione per la creazione e la modifica di contenuti HTML.

## Funzionalità

- Modifica di testo ricco
- Ampia gamma di opzioni di formattazione
- Supporto per toolbar e plugin personalizzati

## Input

- `wysiwygOptions`: `object` — Opzioni di configurazione per l'editor. **(Obbligatorio)**
- `minHeight`: `string | undefined` — Altezza minima dell'area editor. Default: `'200px'`.
- `highlightColor`: `boolean` — Mostra/nasconde il pulsante colore evidenziatore nella toolbar. Default: `true`.
- `isReadonly`: `boolean` — Se true, l'editor è di sola lettura.
- `onImageUploadError`: `(errorMessage: any, result: any, core: any) => boolean` — Callback per errori di upload immagini.
- `onFileDrop`: `(e: any, cleanData: any, maxCharCount: any, core: any) => boolean` — Callback per eventi di trascinamento file.
- Toggle dei pulsanti della toolbar (tutti `boolean`, default: `true`):
  - `font`, `fontSize`, `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`, `fontColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`, `image`, `fullScreen`, `showBlocks`
- Tutti gli input standard di form/etichetta/validazione ereditati da `QuangBaseComponent`:
  - `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Output

- Tutti gli output standard ereditati da `QuangBaseComponent`:
  - `componentBlur`

## Esempio d'uso

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

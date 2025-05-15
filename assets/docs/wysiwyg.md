# QuangWysiwygComponent

The `QuangWysiwygComponent` is a rich text editor based on [SunEditor](https://github.com/JiHong88/SunEditor), offering a wide range of formatting options for creating and editing HTML content.

## Features

- Rich text editing
- Wide range of formatting options
- Supports custom toolbars and plugins

## Inputs

- `wysiwygOptions`: `object` — Configuration options for the editor. **(Required)**
- `minHeight`: `string | undefined` — Minimum height for the editor area. Default: `'200px'`.
- `highlightColor`: `boolean` — Show/hide the highlight color button in the toolbar. Default: `true`.
- `isReadonly`: `boolean` — If true, the editor is readonly.
- `onImageUploadError`: `(errorMessage: any, result: any, core: any) => boolean` — Callback for image upload errors.
- `onFileDrop`: `(e: any, cleanData: any, maxCharCount: any, core: any) => boolean` — Callback for file drop events.
- Toolbar button toggles (all `boolean`, default: `true`):
  - `font`, `fontSize`, `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`, `fontColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`, `image`, `fullScreen`, `showBlocks`
- All standard form/label/validation-related inputs inherited from `QuangBaseComponent`:
  - `componentLabel`, `componentPlaceholder`, `componentTabIndex`, `componentClass`, `errorMap`, `successMessage`, `helpMessage`, `formControl`

## Outputs

- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`

## Usage

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

### Note

Remember to import:

`node_modules/quang/components/wysiwyg/global-wysiswyg.component.scss`

or

`quang/components/wysiwyg/global-wysiswyg.component.scss`

in your global style (suggested "vendors" folder).

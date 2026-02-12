# QuangWysiwygComponent

The `QuangWysiwygComponent` is a rich text editor based on [SunEditor](https://github.com/JiHong88/SunEditor), offering a wide range of formatting options for creating and editing HTML content.


## Input

- `wysiwygOptions`: `object` — Configuration options for the editor (required)
- `minHeight`: `string | undefined` — Minimum height for the editor area (default: '200px')
- `highlightColor`: `boolean` — Show/hide the highlight color button in toolbar (default: true)
- `isReadonly`: `boolean` — If true, the editor is readonly
- `onImageUploadError`: `(errorMessage: any, result: any, core: any) => boolean` — Callback for image upload errors
- `onFileDrop`: `(e: any, cleanData: any, maxCharCount: any, core: any) => boolean` — Callback for file drop events
- Toolbar button toggles (all `boolean`, default: `true`): `font`, `fontSize`, `formatBlock`, `paragraphStyle`, `blockquote`, `bold`, `underline`, `italic`, `strike`, `fontColor`, `textStyle`, `removeFormat`, `align`, `list`, `table`, `link`, `image`, `fullScreen`, `showBlocks`

All standard inputs inherited from `QuangBaseComponent`:
- `componentLabel`: `string` — Label text (supports i18n keys)
- `componentPlaceholder`: `string` — Placeholder text (supports i18n keys)
- `componentTabIndex`: `number` — Tab index for accessibility
- `componentClass`: `string` — Additional CSS classes
- `errorMap`: `ErrorData[]` — Validation error messages
- `successMessage`: `string` — Success message text
- `helpMessage`: `string` — Help text displayed below the editor
- `helpMessageTooltip`: `boolean` — If true, displays help message as a tooltip (with projected icon); if false, displays help message inline below the editor. Default: `false`
- `formControl`: `FormControl` — Angular reactive form control
- Tooltip icon projection: to display the tooltip icon, use `<ng-content select="[help-icon]" />` in the component template.

## Output

- All standard outputs inherited from `QuangBaseComponent`:
  - `componentBlur`: emitted when the editor loses focus


## Usage

### Basic Editor
```html
<quang-wysiwyg
  [errorMap]="errors"
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

### Inline Help Message
```html
<quang-wysiwyg
  [wysiwygOptions]="wysiwygOptions"
  componentLabel="form.label.wysiwyg"
  helpMessage="form.help.wysiwyg"
  [helpMessageTooltip]="false"
  formControlName="testInput"
/>
```

### Tooltip Help Message
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

### Note

Remember to import:
`node_modules/quang/components/wysiwyg/global-wysiswyg.component.scss`
or
`quang/components/wysiwyg/global-wysiswyg.component.scss`
in your global style (suggested "vendors" folder).

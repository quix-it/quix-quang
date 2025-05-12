# QuangWysiwygComponent

The `QuangWysiwygComponent` is a rich text editor based on [SunEditor](https://github.com/JiHong88/SunEditor), offering a wide range of formatting options for creating and editing HTML content.

## Features
- Rich text editing
- Wide range of formatting options
- Supports custom toolbars and plugins

## Inputs
- `editorOptions`: Configuration options for the editor. (Required)
- `placeholder`: Placeholder text for the editor. Default is `"Start typing..."`.

## Outputs
- `contentChange`: Emits the updated content when it changes.

## Usage
```html
<quang-wysiwyg
  [editorOptions]="{ toolbar: ['bold', 'italic', 'underline'] }"
  [placeholder]="'Write something...'"
  (contentChange)="onContentChange($event)"
></quang-wysiwyg>
```

### Note
Remember to import:

`node_modules/quang/components/wysiwyg/global-wysiswyg.component.scss`

or

`quang/components/wysiwyg/global-wysiswyg.component.scss`

in your global style (suggested "vendors" folder).

import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { ContentChange, QuillEditorComponent } from 'ngx-quill'
import { BehaviorSubject } from 'rxjs'

/**
 * text editor component decorator
 */
@Component({
  selector: 'quang-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
 * text editor component
 */
export class QuangWysiwygEditorComponent implements ControlValueAccessor, AfterViewInit, OnInit, DoCheck {
  /**
   * The label to display on the input field
   */
  @Input() label: string = ''
  /**
   * The placeholder of the input field
   */
  @Input() placeholder: string = ''
  /**
   * Html id of input
   */
  @Input() id: string = ''
  /**
   * Defines if you want to display the success message for the user
   */
  @Input() successMessage: boolean = false
  /**
   * Defines if you want to display the error message for the user
   */
  @Input() errorMessage: boolean = false
  /**
   * Defines if you want to display the help message for the user
   */
  @Input() helpMessage: boolean = false
  /**
   * Indicates whether, when the page is opened,
   * this input field should be displayed in a focused state or not
   */
  @Input() autofocus: boolean = false
  /**
   * Defines whether the input field is in a read-only state
   */
  @Input() readonly: boolean = false
  /**
   * Indicate the position in the page navigation flow with the tab key
   */
  @Input() tabIndex: number = 0
  /**
   * Determine the arialabel tag for accessibility,
   * If not specified, it takes 'input' concatenated to the label by default
   */
  @Input() ariaLabel: string = `Input ${this.label}`
  /**
   * The name of the form, this input is used to create keys for error, validation or help messages.
   * It will be the first key element generated
   */
  @Input() formName: string = ''
  /**
   * Defines whether the return value of the field must be in text or html format
   */
  @Input() returnHtml: boolean = true
  /**
   * Lists toolbar
   */
  @Input() listBar: boolean = false
  /**
   * Text type toolbar
   */
  @Input() textTypeBar: boolean = false
  /**
   * Text style toolbar
   */
  @Input() textStyleBar: boolean = false
  /**
   * Toolbar for text alignment
   */
  @Input() alignBar: boolean = false
  /**
   * Font selection toolbar
   */
  @Input() fontBar: boolean = false
  /**
   * Toolbar for inserting media
   */
  @Input() mediaBar: boolean = false
  /**
   * Toolbar for inserting link
   */
  @Input() mediaLinkBar: boolean = false
  /**
   * Toolbar for inserting image
   */
  @Input() mediaImageBar: boolean = false
  /**
   * Toolbar for inserting video
   */
  @Input() mediaVideoBar: boolean = false
  /**
   * headers bar
   */
  @Input() headerBar: boolean = false
  /**
   * Text size toolbar
   */
  @Input() sizeBar: boolean = false
  /**
   * Toolbar for selecting emojis
   */
  @Input() emojiBar: boolean = false
  /**
   * Toolbar for selecting indentation
   */
  @Input() indentBar: boolean = false
  /**
   * preserve white space
   */
  @Input() preserveWhitespace: boolean = false
  /**
   * Array of additional classes to the input field
   */
  @Input() customClass: string[] = []
  /**
   * Define if quill have to sanitize the html
   */
  @Input() sanitize: boolean = false
  @Input() extraConfigData: Record<string, unknown> = {}
  /**
   *
   */
  @Output() blurred: EventEmitter<any> = new EventEmitter<any>()
  /**
   * The html input element
   */
  @ViewChild('input', { static: true }) input: QuillEditorComponent | undefined
  /**
   * The value of the input
   */
  _value: string = ''
  /**
   * the status of the success message
   */
  _successMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * The status of the toolbar
   */
  _toolbar: any[] = []
  /**
   * Define disabled state
   */
  _disabled: boolean = false
  /**
   * The status of the modules
   */
  modules: Record<string, any> = {}
  public quillNativeInstance$ = new BehaviorSubject<QuillEditorComponent | null>(null)

  @Input() errorMap: Record<string, string>

  errorMessageKey: string = ''

  requiredValue: string = ''

  /**
   * constructor
   * @param renderer html access
   * @param elementRef
   * @param ngControl cva access
   */
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this
  }

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {}

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {}

  /**
   * Check if the help message is required and create the key
   * Check the selected toolbars and add them to the configuration object
   */
  ngOnInit(): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.ngControl?.name}.help`
    }
    if (this.listBar) {
      this._toolbar.push([{ list: 'ordered' }, { list: 'bullet' }])
    }
    if (this.textTypeBar) {
      this._toolbar.push(['bold', 'italic', 'underline', 'strike'])
      this._toolbar.push(['blockquote', 'code-block'])
    }
    if (this.textStyleBar) {
      this._toolbar.push([{ color: [] }, { background: [] }])
    }
    if (this.alignBar) {
      this._toolbar.push([{ align: [] }])
    }
    if (this.fontBar) {
      this._toolbar.push([{ font: [] }])
    }
    if (this.mediaBar) {
      this._toolbar.push(['link', 'image', 'video'])
    } else {
      if (this.mediaLinkBar) {
        this._toolbar.push(['link'])
      }
      if (this.mediaImageBar) {
        this._toolbar.push(['image'])
      }
      if (this.mediaVideoBar) {
        this._toolbar.push(['video'])
      }
    }
    if (this.headerBar) {
      this._toolbar.push([{ header: [1, 2, 3, 4, 5, 6, false] }])
    }
    if (this.sizeBar) {
      this._toolbar.push([{ size: ['small', 'normal', 'large', 'huge'] }])
    }
    if (this.indentBar) {
      this._toolbar.push([{ indent: '-1' }, { indent: '+1' }])
    }
    if (this.emojiBar) {
      this._toolbar['emoji-shortname'] = true
      this._toolbar['emoji-textarea'] = true
      this._toolbar['emoji-toolbar'] = true
    }
    this.modules = {
      toolbar: this._toolbar,
      ...this.extraConfigData
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
   * Start the check on the validation of the field
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.editorElem.focus()
      }
    }, 0)
  }

  ngDoCheck(): void {
    if (!this.errorMessage || this.ngControl?.valid) return
    const errorKey = Object.keys(this.ngControl?.errors ?? {})[0]
    this.errorMessageKey = this.errorMap?.[errorKey] ?? `${this.formName}.${this.ngControl?.name}.${errorKey}`
    this.requiredValue =
      this.ngControl?.errors?.[errorKey]?.[
        errorKey === 'minlength' || errorKey === 'maxlength' ? 'requiredLength' : 'requiredValue'
      ]
  }

  public forceFocus(): void {
    this.input?.editorElem.focus()
  }

  /**
   * check if the input field should have focus when the page is rendered
   * @param editor
   */
  checkFocus(editor: any): void {
    this.quillNativeInstance$.next(editor)
    if (this.autofocus) {
      editor.focus()
    }
  }

  emitBlur(): void {
    this.onTouched()
    this.blurred.emit()
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn
  }

  /**
   * When the input changes,
   * its value is retrieved from the html element and the status change is signaled to the form
   * @param e
   */
  onChangedHandler(e: ContentChange): void {
    this.onTouched()
    this.onChanged(this.returnHtml ? e.html : e.text === '\n' ? null : e.text)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue(value: any): void {
    this._value = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.input?.setDisabledState(isDisabled || this.readonly)
    this._disabled = isDisabled || this.readonly
  }
}

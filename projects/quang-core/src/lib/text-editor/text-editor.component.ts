import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { delay, filter } from 'rxjs/operators'
import 'quill-emoji/dist/quill-emoji.js'
import { ContentChange, QuillEditorComponent } from 'ngx-quill'

/**
 * text editor component decorator
 */
@Component({
  selector: 'quang-text-editor',
  templateUrl: './text-editor.component.html',
  styles: ['']
})
/**
 * text editor component
 */
export class TextEditorComponent implements ControlValueAccessor, AfterViewInit, OnInit {
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
   * Defines the minimum length of the input field
   */
  @Input() min: number = 0
  /**
   * Defines the maximum length of the input field
   */
  @Input() max: number = 0
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
  @Input() returnHtml: boolean = false
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
   * the status of the error message
   */
  _errorMessage: string = ''
  /**
   * the status of the help message
   */
  _helpMessage: string = ''
  /**
   * Contains the value required by a validation when it fails
   */
  _requiredValue: any = ''
  /**
   * The status of the toolbar
   */
  _toolbar: any = { toolbar: [] }
  /**
   * The status of the modules
   */
  modules: { [key: string]: string } = {}

  /**
   * Standard definition to create a control value accessor
   */
  onTouched: any = () => {
  }

  /**
   * Standard definition to create a control value accessor
   */
  onChanged: any = () => {
  }

  /**
   * constructor
   * @param renderer html access
   * @param elementRef
   * @param control cva access
   */
  constructor (
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    @Self() @Optional() public control: NgControl
  ) {
    this.control.valueAccessor = this
  }

  /**
   * Check if the help message is required and create the key
   * Check the selected toolbars and add them to the configuration object
   */
  ngOnInit (): void {
    if (this.helpMessage) {
      this._helpMessage = `${this.formName}.${this.control?.name}.help`
    }
    if (this.successMessage) {
      this._successMessage = `${this.formName}.${this.control?.name}.valid`
    }
    if (this.listBar) {
      this._toolbar.toolbar.push([{ list: 'ordered' }, { list: 'bullet' }])
    }
    if (this.textTypeBar) {
      this._toolbar.toolbar.push(['bold', 'italic', 'underline', 'strike'])
      this._toolbar.toolbar.push(['blockquote', 'code-block'])
    }
    if (this.textStyleBar) {
      this._toolbar.toolbar.push([{ color: [] }, { background: [] }])
    }
    if (this.alignBar) {
      this._toolbar.toolbar.push([{ align: [] }])
    }
    if (this.fontBar) {
      this._toolbar.toolbar.push([{ font: [] }])
    }
    if (this.mediaBar) {
      this._toolbar.toolbar.push(['link', 'image', 'video'])
    }
    if (this.headerBar) {
      this._toolbar.toolbar.push([{ header: [1, 2, 3, 4, 5, 6, false] }])
    }
    if (this.sizeBar) {
      this._toolbar.toolbar.push([{ size: ['small', 'normal', 'large', 'huge'] }])
    }
    if (this.indentBar) {
      this._toolbar.toolbar.push([{ indent: '-1' }, { indent: '+1' }])
    }
    if (this.emojiBar) {
      this._toolbar['emoji-shortname'] = true
      this._toolbar['emoji-textarea'] = true
      this._toolbar['emoji-toolbar'] = true
    }
  }

  /**
   * Checks if focus is required when displaying the input field.
   * Start the check on the validation of the field
   */
  ngAfterViewInit (): void {
    setTimeout(() => {
      if (this.autofocus) {
        this.input?.editorElem.focus()
      }
    }, 0)
    this.observeValidate()
  }

  /**
   * check if the input field should have focus when the page is rendered
   * @param editor
   */
  checkFocus (editor: any): void {
    if (this.autofocus) {
      editor.focus()
    }
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnTouched (fn: any): void {
    this.onTouched = fn
  }

  /**
   * Standard definition to create a control value accessor
   */
  registerOnChange (fn: any): void {
    this.onChanged = fn
  }

  /**
   * When the input changes,
   * its value is retrieved from the html element and the status change is signaled to the form
   * @param e
   */
  onChangedHandler (e: ContentChange): void {
    this.onTouched()
    this.onChanged(this.returnHtml ? e.html : e.text === '\n' ? null : e.text)
  }

  /**
   * Standard definition to create a control value accessor
   * When the value of the input field from the form is set, the value of the input html tag is changed
   */
  writeValue (value: any): void {
    this._value = value
  }

  /**
   * Standard definition to create a control value accessor
   * When the input field from the form is disabled, the html input tag is defined as disabled
   */
  setDisabledState (isDisabled: boolean): void {
    this.input?.setDisabledState(isDisabled)
  }

  /**
   * When the input field changes,
   * the validation status is retrieved and the success message or error messages displayed.
   * If there is an error with a specific required value it is passed to the translation pipe
   * to allow for the creation of custom messages
   */
  observeValidate (): void {
    this.control?.statusChanges?.pipe(
      delay(0),
      filter(() => !!this.control.dirty)
    ).subscribe(() => {
      if (this.control.invalid && this.errorMessage) {
        for (const error in this.control.errors) {
          if (Object.prototype.hasOwnProperty.call(this.control.errors.error, '')) {
            if (this.control.errors[error]) {
              this._errorMessage = `${this.formName}.${this.control?.name}.${error}`
              this._requiredValue = this.control.errors[error].requiredValue
            }
          }
        }
      }
    })
  }
}

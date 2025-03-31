import { NgClass, NgIf } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { AbstractControl, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import { filter, take } from 'rxjs'
import sunEditor from 'suneditor'
import SunEditorCore from 'suneditor/src/lib/core'
import { SunEditorOptions } from 'suneditor/src/options'
import plugins from 'suneditor/src/plugins'

import { QuangBaseComponent } from '@quix/quang/components/shared'

export interface QuangWysiwygOptions extends SunEditorOptions {}

@Component({
  selector: 'quang-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangWysiwygComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
/**
 * WYSIWYG (What You See Is What You Get) component based on {@link https://github.com/JiHong88/SunEditor}.
 *
 * This component provides a rich text editor for users to create and edit HTML content.
 * It supports a wide range of formatting options.
 *
 * @usageNotes
 * The component allows you to show or hide buttons from the WYSIWYG editor.
 * By default, all the available buttons are shown in the editor bar.
 *
 * The height of the editor can be customized by setting the `minHeight` property. By default, it is `200px`.
 */
export class QuangWysiwygComponent extends QuangBaseComponent<string> implements AfterViewInit {
  _inputForWysiwyg = viewChild<ElementRef>('inputForWysiwyg')

  minHeight = input<string>('200px')

  font = input<boolean>(true)

  fontSize = input<boolean>(true)

  formatBlock = input<boolean>(true)

  paragraphStyle = input<boolean>(true)

  blockquote = input<boolean>(true)

  bold = input<boolean>(true)

  underline = input<boolean>(true)

  italic = input<boolean>(true)

  strike = input<boolean>(true)

  fontColor = input<boolean>(true)

  highlightColor = input<boolean>(true)

  textStyle = input<boolean>(true)

  removeFormat = input<boolean>(true)

  align = input<boolean>(true)

  list = input<boolean>(true)

  table = input<boolean>(true)

  link = input<boolean>(true)

  image = input<boolean>(true)

  fullScreen = input<boolean>(true)

  showBlocks = input<boolean>(true)

  onImageUploadError = input<(errorMessage: any, result: any, core: any) => boolean>()
  onFileDrop = input<(e: any, cleanData: any, maxCharCount: any, core: any) => boolean>()

  wysiwygOptions = input<QuangWysiwygOptions | undefined>(undefined)

  _sunEditorWysiwygInstance = signal<SunEditorCore | undefined>(undefined)
  _sunEditorWysiwygInstance$ = toObservable(this._sunEditorWysiwygInstance)

  changeDetectorRef = signal(inject(ChangeDetectorRef))

  _generateSunEditorWysiwygEffect = effect(async () => {
    if (this._inputForWysiwyg()?.nativeElement) {
      const sunEditorOptions: SunEditorOptions = {
        plugins,
        defaultTag: 'div',
        buttonList: this._ngControl()?.control?.enabled && !this.isReadonly() ? [this.getButtonList()] : [],
        minHeight: this.minHeight(),
        width: '100%',
        ...(this.wysiwygOptions() ?? {}),
      }

      if (this._sunEditorWysiwygInstance()) {
        if (this._ngControl()?.control?.enabled) {
          this._sunEditorWysiwygInstance()?.enable()
        }
        this._sunEditorWysiwygInstance()?.setOptions(sunEditorOptions)
      } else {
        this._sunEditorWysiwygInstance.set(sunEditor.create(this._inputForWysiwyg()?.nativeElement, sunEditorOptions))
      }

      const imageUploadError = this.onImageUploadError()
      const onFileDrop = this.onFileDrop()
      const sunEditorInstance = this._sunEditorWysiwygInstance()

      if (imageUploadError && sunEditorInstance) {
        sunEditorInstance.onImageUploadError = imageUploadError
      }
      if (onFileDrop && sunEditorInstance) {
        sunEditorInstance.onDrop = onFileDrop
      }

      this.registerEvents()
    }
  })

  STRIP_HTML_REGEX = /<[^>]*>/g

  registerEvents(): void {
    const sunEditorInstance = this._sunEditorWysiwygInstance()
    if (sunEditorInstance) {
      sunEditorInstance.onChange = (contents) => {
        this.onChangedHandler(contents)
        this.changeDetectorRef().markForCheck()
      }
      sunEditorInstance.onBlur = () => {
        this.onBlurHandler()
      }
      if (this._isDisabled()) {
        sunEditorInstance.disable()
      }
    }
  }

  override writeValue(val: string): void {
    super.writeValue(val)
    this._sunEditorWysiwygInstance$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((x) => x !== undefined),
        take(1)
      )
      .subscribe((sunEditorWysiwygInstance) => {
        if (sunEditorWysiwygInstance) {
          sunEditorWysiwygInstance?.setContents(val)
        }
      })
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.hasValidator(Validators.required) && control.value?.replace(this.STRIP_HTML_REGEX, '') === '') {
      return { required: true }
    }
    return null
  }

  override onChangedHandler(value: string): void {
    super.onChangedHandler(value)
    const control = this._ngControl()
    if (control?.control) {
      if (this.validate(control.control)) control.control.setErrors(this.validate(control.control))
    }
  }

  getButtonList(): string[] {
    const buttonList: string[] = []
    if (this.font()) {
      buttonList.push('font')
    }
    if (this.fontSize()) {
      buttonList.push('fontSize')
    }
    if (this.formatBlock()) {
      buttonList.push('formatBlock')
    }
    if (this.paragraphStyle()) {
      buttonList.push('paragraphStyle')
    }
    if (this.blockquote()) {
      buttonList.push('blockquote')
    }
    if (this.bold()) {
      buttonList.push('bold')
    }
    if (this.underline()) {
      buttonList.push('underline')
    }
    if (this.italic()) {
      buttonList.push('italic')
    }
    if (this.strike()) {
      buttonList.push('strike')
    }
    if (this.fontColor()) {
      buttonList.push('fontColor')
    }
    if (this.highlightColor()) {
      buttonList.push('hiliteColor')
    }
    if (this.textStyle()) {
      buttonList.push('textStyle')
    }
    if (this.removeFormat()) {
      buttonList.push('removeFormat')
    }
    if (this.align()) {
      buttonList.push('align')
    }
    if (this.list()) {
      buttonList.push('list')
    }
    if (this.table()) {
      buttonList.push('table')
    }
    if (this.link()) {
      buttonList.push('link')
    }
    if (this.image()) {
      buttonList.push('image')
    }
    if (this.fullScreen()) {
      buttonList.push('fullScreen')
    }
    if (this.showBlocks()) {
      buttonList.push('showBlocks')
    }
    return buttonList
  }
}

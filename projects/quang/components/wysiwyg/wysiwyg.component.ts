import { JsonPipe, NgClass, NgIf } from '@angular/common'
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
  viewChild
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'
import sunEditor from 'suneditor'
import SunEditor from 'suneditor/src/lib/core'
import { SunEditorOptions } from 'suneditor/src/options'
import plugins from 'suneditor/src/plugins'

import { QuangBaseComponent } from '@quix/quang/components/shared'

@Component({
  selector: 'quang-wysiwyg',
  standalone: true,
  templateUrl: './wysiwyg.component.html',
  styleUrl: './wysiwyg.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangWysiwygComponent),
      multi: true
    }
  ],
  imports: [TranslocoPipe, NgIf, NgClass, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangWysiwygComponent extends QuangBaseComponent<string> implements AfterViewInit, Extracted {
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

  _sunEditorWysiwygInstance = signal<SunEditor | undefined>(undefined)
  changeDetectorRef = signal(inject(ChangeDetectorRef))

  /**
   * the actual date wysiwyg is based on {@link https://github.com/JiHong88/SunEditor}
   */
  _generateSunEditorWysiwygEffect = effect(
    async () => {
      if (this._inputForWysiwyg()?.nativeElement) {
        const sunEditorOptions: SunEditorOptions = {
          plugins: plugins,
          buttonList: [this.getButtonList()],
          minHeight: this.minHeight(),
          width: '100%'
        }

        if (this._sunEditorWysiwygInstance()) {
          this._sunEditorWysiwygInstance()?.setOptions(sunEditorOptions)
        } else {
          this._sunEditorWysiwygInstance.set(sunEditor.create(this._inputForWysiwyg()?.nativeElement, sunEditorOptions))
        }

        this.registerEvents()
      }
    },
    {
      allowSignalWrites: true
    }
  )

  constructor() {
    super()
  }

  registerEvents(): void {
    const sunEditor = this._sunEditorWysiwygInstance()
    if (sunEditor) {
      sunEditor.onChange = (contents, core) => {
        this.onChangedHandler(contents)
        this.changeDetectorRef().markForCheck()
      }
      sunEditor.onBlur = () => {
        this.onBlurHandler()
      }
      if (this._isDisabled()) {
        sunEditor.disable()
        sunEditor.toolbar.disable()
      }
    }
  }

  override writeValue(val: string): void {
    super.writeValue(val)
    this._sunEditorWysiwygInstance()?.setContents(val)
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

interface Extracted {
  _inputForWysiwyg: any
  minHeight: any
  font: any
  fontSize: any
  formatBlock: any
  paragraphStyle: any
  blockquote: any
  bold: any
  underline: any
  italic: any
  strike: any
  fontColor: any
  highlightColor: any
  textStyle: any
  removeFormat: any
  align: any
  list: any
  table: any
  link: any
  image: any
  fullScreen: any
  showBlocks: any
  _sunEditorWysiwygInstance: any
  changeDetectorRef: any
  _generateSunEditorWysiwygEffect: any
  registerEvents(): void
  writeValue(val: string): void
  getButtonList(): string[]
}

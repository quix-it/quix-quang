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
  signal,
  viewChild
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@ngneat/transloco'
import sunEditor from 'suneditor'
import 'suneditor/dist/css/suneditor.min.css'
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
export class QuangWysiwygComponent extends QuangBaseComponent<string> implements AfterViewInit {
  _inputForWysiwyg = viewChild<ElementRef>('inputForWysiwyg')
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
          buttonList: [
            [
              'font',
              'fontSize',
              'formatBlock',
              'paragraphStyle',
              'blockquote',
              'bold',
              'underline',
              'italic',
              'strike',
              'fontColor',
              'hiliteColor',
              'textStyle',
              'removeFormat',
              'align',
              'list',
              'table',
              'link',
              'image',
              'fullScreen',
              'showBlocks'
            ]
          ],
          minHeight: '200px'
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
    }
  }

  override writeValue(val: string): void {
    super.writeValue(val)
    this._sunEditorWysiwygInstance()?.setContents(val)
  }
}

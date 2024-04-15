import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, effect, forwardRef, signal, viewChild } from '@angular/core'
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
  imports: [TranslocoPipe, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangWysiwygComponent extends QuangBaseComponent<string> {
  _inputForWysiwyg = viewChild<ElementRef>('inputForWysiwyg')

  _sunEditorWysiwygInstance = signal<SunEditor | undefined>(undefined)

  /**
   * the actual date wysiwyg is based on {@link https://github.com/JiHong88/SunEditor}
   */
  _generateSunEditorWysiwygEffect = effect(async () => {
    if (this._inputForWysiwyg()?.nativeElement) {
      const sunEditorOptions: SunEditorOptions = {
        plugins: plugins,
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          '/', // Line break
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
          ['fullScreen', 'showBlocks', 'codeView'],
          ['preview', 'print']
          /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
        ],
        minHeight: '300px'
      }

      if (this._sunEditorWysiwygInstance()) {
        this._sunEditorWysiwygInstance()?.setOptions(sunEditorOptions)
      } else {
        sunEditor.create(this._inputForWysiwyg()?.nativeElement, sunEditorOptions)
      }
    }
  })

  constructor() {
    super()
  }
}

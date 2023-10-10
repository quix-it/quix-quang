import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { QuillModule } from 'ngx-quill'

import { QuangWysiwygEditorComponent } from './wysiwyg-editor.component'

@NgModule({
  declarations: [QuangWysiwygEditorComponent],
  imports: [CommonModule, QuillModule.forRoot(), TranslocoModule, FormsModule, BsDatepickerModule],
  exports: [QuangWysiwygEditorComponent]
})
export class QuangWysiwygEditorModule {}

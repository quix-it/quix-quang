import { NgModule } from '@angular/core'
import { TextEditorComponent } from './text-editor.component'
import { QuillModule } from 'ngx-quill'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [TextEditorComponent],
  imports: [CommonModule, QuillModule.forRoot(), TranslocoModule, FormsModule],
  exports: [TextEditorComponent]
})
export class TextEditorModule {}

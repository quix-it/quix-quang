import { NgModule } from '@angular/core'
import { InputFileComponent } from './input-file.component'
import { NgxFileDropModule } from 'ngx-file-drop'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputFileComponent],
  imports: [CommonModule, NgxFileDropModule, TranslocoModule, FormsModule],
  exports: [InputFileComponent]
})
export class InputFileModule {}

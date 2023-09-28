import { NgModule } from '@angular/core'
import { QuangInputFileComponent } from './input-file.component'
import { NgxFileDropModule } from 'ngx-file-drop'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputFileComponent],
  imports: [CommonModule, NgxFileDropModule, TranslocoModule, FormsModule],
  exports: [QuangInputFileComponent]
})
export class QuangInputFileModule {}

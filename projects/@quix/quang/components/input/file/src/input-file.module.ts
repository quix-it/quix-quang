import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { NgxFileDropModule } from 'ngx-file-drop'

import { QuangInputFileComponent } from './input-file.component'

@NgModule({
  declarations: [QuangInputFileComponent],
  imports: [CommonModule, NgxFileDropModule, TranslocoModule, FormsModule],
  exports: [QuangInputFileComponent]
})
export class QuangInputFileModule {}

import { NgModule } from '@angular/core'
import { TextAreaComponent } from './text-area.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [TextAreaComponent]
})
export class TextAreaModule {}

import { NgModule } from '@angular/core'
import { InputUrlComponent } from './input-url.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputUrlComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputUrlComponent]
})
export class InputUrlModule {}

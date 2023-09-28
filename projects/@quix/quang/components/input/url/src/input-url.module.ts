import { NgModule } from '@angular/core'
import { QuangInputUrlComponent } from './input-url.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputUrlComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputUrlComponent]
})
export class QuangInputUrlModule {}

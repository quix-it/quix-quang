import { NgModule } from '@angular/core'
import { InputSearchComponent } from './input-search.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputSearchComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputSearchComponent]
})
export class QuangInputSearchModule {}

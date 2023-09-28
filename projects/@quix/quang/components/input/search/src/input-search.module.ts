import { NgModule } from '@angular/core'
import { QuangInputSearchComponent } from './input-search.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputSearchComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputSearchComponent]
})
export class QuangInputSearchModule {}

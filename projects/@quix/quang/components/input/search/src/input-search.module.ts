import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputSearchComponent } from './input-search.component'

@NgModule({
  declarations: [QuangInputSearchComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputSearchComponent]
})
export class QuangInputSearchModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { DatalistComponent } from './datalist.component'

@NgModule({
  declarations: [DatalistComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [DatalistComponent]
})
export class QuangDatalistModule {}

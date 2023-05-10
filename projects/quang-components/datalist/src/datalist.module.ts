import { NgModule } from '@angular/core'
import { DatalistComponent } from './datalist.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DatalistComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [DatalistComponent]
})
export class DatalistModule {}

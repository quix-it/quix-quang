import { NgModule } from '@angular/core'
import { SelectObjComponent } from './select-obj.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [SelectObjComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [SelectObjComponent]
})
export class SelectObjModule {}

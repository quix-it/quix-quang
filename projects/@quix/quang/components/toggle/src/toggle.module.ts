import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangToggleComponent } from './toggle.component'

@NgModule({
  declarations: [QuangToggleComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangToggleComponent]
})
export class QuangToggleModule {}

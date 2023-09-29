import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangSliderComponent } from './slider.component'

@NgModule({
  declarations: [QuangSliderComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangSliderComponent]
})
export class QuangSliderModule {}

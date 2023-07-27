import { NgModule } from '@angular/core'
import { SliderComponent } from './slider.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { MatLegacySliderModule } from '@angular/material/legacy-slider'

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, TranslocoModule, FormsModule, MatLegacySliderModule],
  exports: [SliderComponent]
})
export class QuangSliderModule {}

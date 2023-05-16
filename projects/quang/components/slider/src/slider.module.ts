import { NgModule } from '@angular/core'
import { SliderComponent } from './slider.component'
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, MatSliderModule, TranslocoModule, FormsModule],
  exports: [SliderComponent]
})
export class QuangSliderModule {}

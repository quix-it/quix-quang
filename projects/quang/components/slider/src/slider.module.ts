import { NgModule } from '@angular/core'
import { SliderComponent } from './slider.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [SliderComponent]
})
export class QuangSliderModule {}

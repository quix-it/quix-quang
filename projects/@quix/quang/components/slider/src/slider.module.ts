import { NgModule } from '@angular/core'
import { QuangSliderComponent } from './slider.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangSliderComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangSliderComponent]
})
export class QuangSliderModule {}

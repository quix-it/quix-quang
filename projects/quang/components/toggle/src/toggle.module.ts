import { NgModule } from '@angular/core'
import { ToggleComponent } from './toggle.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [ToggleComponent],
  imports: [CommonModule, MatSlideToggleModule, TranslocoModule, FormsModule],
  exports: [ToggleComponent]
})
export class QuangToggleModule {}

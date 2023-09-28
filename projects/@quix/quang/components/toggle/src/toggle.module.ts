import { NgModule } from '@angular/core'
import { QuangToggleComponent } from './toggle.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangToggleComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangToggleComponent]
})
export class QuangToggleModule {}

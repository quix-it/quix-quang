import { NgModule } from '@angular/core'
import { InputEmailComponent } from './input-email.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [InputEmailComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [InputEmailComponent]
})
export class InputEmailModule {}

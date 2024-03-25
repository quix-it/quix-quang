import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangInputEmailComponent } from './input-email.component'

@NgModule({
  declarations: [QuangInputEmailComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputEmailComponent]
})
export class QuangInputEmailModule {}

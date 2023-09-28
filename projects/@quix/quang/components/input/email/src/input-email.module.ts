import { NgModule } from '@angular/core'
import { QuangInputEmailComponent } from './input-email.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [QuangInputEmailComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangInputEmailComponent]
})
export class QuangInputEmailModule {}

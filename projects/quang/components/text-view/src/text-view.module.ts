import { NgModule } from '@angular/core'
import { TextViewComponent } from './text-view.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [TextViewComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [TextViewComponent]
})
export class QuangTextViewModule {}

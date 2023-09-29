import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangWysiwygViewComponent } from './wysiwyg-view.component'

@NgModule({
  declarations: [QuangWysiwygViewComponent],
  imports: [CommonModule, TranslocoModule, FormsModule],
  exports: [QuangWysiwygViewComponent]
})
export class QuangWysiwygViewModule {}

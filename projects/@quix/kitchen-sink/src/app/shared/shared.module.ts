import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TitleComponent } from './title/title.component'

@NgModule({
  declarations: [TitleComponent],
  exports: [TitleComponent],
  imports: [CommonModule]
})
export class SharedModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { QuangImageSrcDirective } from './image-src.directive'

@NgModule({
  declarations: [QuangImageSrcDirective],
  imports: [CommonModule],
  exports: [QuangImageSrcDirective]
})
export class QuangImageSrcModule {}

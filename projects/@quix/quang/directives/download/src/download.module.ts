import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { QuangDownloadDirective } from './download.directive'

@NgModule({
  declarations: [QuangDownloadDirective],
  imports: [CommonModule],
  exports: [QuangDownloadDirective]
})
export class QuangDownloadModule {}

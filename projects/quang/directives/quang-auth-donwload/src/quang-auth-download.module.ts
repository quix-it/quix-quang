import { NgModule } from '@angular/core'
import { QuangAuthDownloadDirective } from './quang-auth-download.directive'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [QuangAuthDownloadDirective],
  imports: [CommonModule],
  exports: [QuangAuthDownloadDirective]
})
export class QuangAuthDownloadModule {}

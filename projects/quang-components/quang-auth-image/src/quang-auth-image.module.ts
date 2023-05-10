import { NgModule } from '@angular/core'
import { QuangAuthImageDirective } from './quang-auth-image.directive'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [QuangAuthImageDirective],
  imports: [CommonModule],
  exports: [QuangAuthImageDirective]
})
export class QuangAuthImageModule {}

import { NgModule } from '@angular/core'
import { QuixCardComponent } from './quix-card/quix-card.component'
import { QuixCardActionComponent } from './quix-card-action/quix-card-action.component'
import { QuixCardSimpleComponent } from './quix-card-simple/quix-card-simple.component'
import { CommonModule } from '@angular/common'
import { QuixCardHeaderComponent } from './quix-card-header/quix-card-header.component'
import { QuixCardActionHeaderComponent } from './quix-card-action-header/quix-card-action-header.component'
import { QuixCardImageComponent } from './quix-card-image/quix-card-image.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [
    QuixCardComponent,
    QuixCardActionComponent,
    QuixCardActionHeaderComponent,
    QuixCardSimpleComponent,
    QuixCardHeaderComponent,
    QuixCardImageComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [
    QuixCardComponent,
    QuixCardActionComponent,
    QuixCardActionHeaderComponent,
    QuixCardSimpleComponent,
    QuixCardHeaderComponent,
    QuixCardImageComponent
  ]
})
export class QuangComponentsModule {}

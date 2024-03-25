import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslocoModule } from '@ngneat/transloco'

import { QuangCardActionHeaderComponent } from './action-header/card-action-header.component'
import { QuangCardActionComponent } from './action/card-action.component'
import { QuangCardComponent } from './card/card.component'
import { QuangCardFooterComponent } from './footer/card-footer.component'
import { QuangCardHeaderComponent } from './header/card-header.component'
import { QuangCardImageComponent } from './image/card-image.component'
import { QuangSimpleCardComponent } from './simple/simple-card.component'

@NgModule({
  declarations: [
    QuangCardComponent,
    QuangCardActionComponent,
    QuangCardActionHeaderComponent,
    QuangSimpleCardComponent,
    QuangCardHeaderComponent,
    QuangCardImageComponent,
    QuangCardFooterComponent
  ],
  imports: [CommonModule, TranslocoModule],
  exports: [
    QuangCardComponent,
    QuangCardActionComponent,
    QuangCardActionHeaderComponent,
    QuangSimpleCardComponent,
    QuangCardHeaderComponent,
    QuangCardImageComponent,
    QuangCardFooterComponent
  ]
})
export class QuangCardsModule {}

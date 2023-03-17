import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { KsComponentsRoutingModule } from './ks-components-routing.module'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { CardComponent } from './card/card.component'
import { SharedModule } from '../shared/shared.module'
import { CardHeaderComponent } from './card-header/card-header.component'
import { CardSimpleComponent } from './card-simple/card-simple.component'
import { CardActionHeaderComponent } from './card-action-header/card-action-header.component'
import { CardActionComponent } from './card-action/card-action.component'
import { CardImageComponent } from './card-image/card-image.component'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardSimpleComponent,
    CardActionHeaderComponent,
    CardActionComponent,
    CardImageComponent
  ],
  imports: [
    CommonModule,
    KsComponentsRoutingModule,
    SharedModule,
    QuangComponentsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'components' }]
})
export class KsComponentsModule {}

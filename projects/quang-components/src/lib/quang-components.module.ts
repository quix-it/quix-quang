import { NgModule } from '@angular/core'
import { CardComponent } from './card/card.component'
import { CardActionComponent } from './card-action/card-action.component'
import { CardSimpleComponent } from './card-simple/card-simple.component'
import { CommonModule } from '@angular/common'
import { CardHeaderComponent } from './card-header/card-header.component'
import { CardActionHeaderComponent } from './card-action-header/card-action-header.component'
import { CardImageComponent } from './card-image/card-image.component'
import { TranslocoModule } from '@ngneat/transloco'
import { CardFooterComponent } from './card-footer/card-footer.component'

@NgModule({
  declarations: [
    CardComponent,
    CardActionComponent,
    CardActionHeaderComponent,
    CardSimpleComponent,
    CardHeaderComponent,
    CardImageComponent,
    CardFooterComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [
    CardComponent,
    CardActionComponent,
    CardActionHeaderComponent,
    CardSimpleComponent,
    CardHeaderComponent,
    CardImageComponent,
    CardFooterComponent
  ]
})
export class QuangComponentsModule {}

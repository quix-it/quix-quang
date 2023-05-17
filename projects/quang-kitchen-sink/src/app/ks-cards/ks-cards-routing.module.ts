import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CardComponent } from './card/card.component'
import { CardHeaderComponent } from './card-header/card-header.component'
import { CardSimpleComponent } from './card-simple/card-simple.component'
import { CardActionComponent } from './card-action/card-action.component'
import { CardActionHeaderComponent } from './card-action-header/card-action-header.component'
import { CardImageComponent } from './card-image/card-image.component'

const routes: Routes = [
  { path: 'card', component: CardComponent },
  { path: 'card-action', component: CardActionComponent },
  { path: 'card-action-header', component: CardActionHeaderComponent },
  { path: 'card-header', component: CardHeaderComponent },
  { path: 'card-simple', component: CardSimpleComponent },
  { path: 'card-image', component: CardImageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsCardsRoutingModule {}

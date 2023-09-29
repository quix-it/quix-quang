import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangMapModule } from '@quix/quang/components/map'

import { SharedModule } from '../../shared/shared.module'
import { KsMapRoutingModule } from './ks-map-routing.module'

import { GoogleComponent } from './google/google.component'
import { OsComponent } from './os/os.component'

@NgModule({
  declarations: [GoogleComponent, OsComponent],
  imports: [CommonModule, KsMapRoutingModule, QuangCardsModule, TranslocoModule, SharedModule, QuangMapModule],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'map' }]
})
export class KsMapModule {}

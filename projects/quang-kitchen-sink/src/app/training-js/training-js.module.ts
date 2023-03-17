import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingJsRoutingModule } from './training-js-routing.module'
import { TrainingMapComponent } from './training-map/training-map.component'
import { TrainingArrayComponent } from './training-array/training-array.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'

@NgModule({
  declarations: [TrainingMapComponent, TrainingArrayComponent],
  imports: [
    CommonModule,
    TrainingJsRoutingModule,
    SharedModule,
    QuangComponentsModule,
    ReactiveFormsModule,
    TranslocoModule,
    TabsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'js' }]
})
export class TrainingJsModule {}

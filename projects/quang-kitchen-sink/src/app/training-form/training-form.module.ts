import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TrainingFormRoutingModule } from './training-form-routing.module'
import { ControlComponent } from './control/control.component'
import { GroupComponent } from './group/group.component'
import { ArrayComponent } from './array/array.component'
import { ArrayArrayComponent } from './array-array/array-array.component'
import { ArrayGroupComponent } from './array-group/array-group.component'
import { GroupArrayComponent } from './group-array/group-array.component'
import { GroupGroupComponent } from './group-group/group-group.component'
import { SharedModule } from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SyncValidatorComponent } from './sync-validator/sync-validator.component'
import { AsyncValidatorComponent } from './async-validator/async-validator.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'

@NgModule({
  declarations: [
    ControlComponent,
    GroupComponent,
    ArrayComponent,
    ArrayArrayComponent,
    ArrayGroupComponent,
    GroupArrayComponent,
    GroupGroupComponent,
    SyncValidatorComponent,
    AsyncValidatorComponent
  ],
  imports: [
    CommonModule,
    TrainingFormRoutingModule,
    SharedModule,
    QuangCardsModule,
    ReactiveFormsModule,
    TranslocoModule,
    QuangComponentsModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'form' }]
})
export class TrainingFormModule {}

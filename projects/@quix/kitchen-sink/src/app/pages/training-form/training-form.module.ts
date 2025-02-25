import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import { QuangCardsModule } from '@quix/quang/components/cards'
import { QuangInputCheckboxModule } from '@quix/quang/components/input/checkbox'
import { QuangInputEmailModule } from '@quix/quang/components/input/email'
import { QuangInputTextModule } from '@quix/quang/components/input/text'

import { SharedModule } from '../../shared/shared.module'
import { TrainingFormRoutingModule } from './training-form-routing.module'

import { ArrayArrayComponent } from './array-array/array-array.component'
import { ArrayGroupComponent } from './array-group/array-group.component'
import { ArrayComponent } from './array/array.component'
import { AsyncValidatorComponent } from './async-validator/async-validator.component'
import { ControlComponent } from './control/control.component'
import { GroupArrayComponent } from './group-array/group-array.component'
import { GroupGroupComponent } from './group-group/group-group.component'
import { GroupComponent } from './group/group.component'
import { SyncValidatorComponent } from './sync-validator/sync-validator.component'

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
    ReactiveFormsModule,
    TranslocoModule,
    QuangCardsModule,
    QuangInputTextModule,
    QuangInputEmailModule,
    QuangInputCheckboxModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'form' }]
})
export class TrainingFormModule {}

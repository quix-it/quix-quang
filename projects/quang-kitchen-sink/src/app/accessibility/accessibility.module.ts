import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { FormComponent } from './form/form.component'
import { AccessibilityRoutingModule } from './accessibility-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MasterComponent } from './master/master.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { QuangComponentsModule } from '../../../../quang-components/src/lib/quang-components.module'
import { QuangDateModule } from '../../../../quang-date/src/lib/quang-date.module'

@NgModule({
  declarations: [FormComponent, MasterComponent],
  imports: [
    CommonModule,
    AccessibilityRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangComponentsModule,
    QuangDateModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'accessibility'
    }
  ]
})
export class AccessibilityModule {}

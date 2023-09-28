import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { FormComponent } from './form/form.component'
import { AccessibilityRoutingModule } from './accessibility-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MasterComponent } from './master/master.component'
import { QuangCardsModule } from '../../../../@quix/quang/cards/src/lib/quang-cards.module'
import { QuangInputTextModule } from '../../../../@quix/quang/components/input-text/src/input-text.module'
import { QuangInputEmailModule } from '../../../../@quix/quang/components/input-email/src/input-email.module'
import { QuangInputDateModule } from '../../../../@quix/quang/components/input-date/src/input-date.module'
import { QuangInputTelModule } from '../../../../@quix/quang/components/input-tel/src/input-tel.module'
import { QuangInputCheckboxModule } from '../../../../@quix/quang/components/input-checkbox/src/input-checkbox.module'
import { QuangPaginatorModule } from '../../../../@quix/quang/components/paginator/src/paginator.module'

@NgModule({
  declarations: [FormComponent, MasterComponent],
  imports: [
    CommonModule,
    AccessibilityRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangInputTextModule,
    QuangInputEmailModule,
    QuangInputDateModule,
    QuangInputTelModule,
    QuangInputCheckboxModule,
    QuangPaginatorModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'accessibility'
    }
  ]
})
export class AccessibilityModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'
import { SharedModule } from '../shared/shared.module'
import { FormComponent } from './form/form.component'
import { AccessibilityRoutingModule } from './accessibility-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MasterComponent } from './master/master.component'
import { QuangCardsModule } from '../../../../quang-cards/src/lib/quang-cards.module'
import { InputTextModule } from 'projects/quang-components/input-text/public-api'
import { InputEmailModule } from 'projects/quang-components/input-email/public-api'
import { InputDateModule } from 'projects/quang-components/input-date/public-api'
import { InputTelModule } from 'projects/quang-components/input-tel/public-api'
import { InputCheckboxModule } from 'projects/quang-components/input-checkbox/public-api'
import { PaginatorModule } from 'projects/quang-components/paginator/public-api'

@NgModule({
  declarations: [FormComponent, MasterComponent],
  imports: [
    CommonModule,
    AccessibilityRoutingModule,
    SharedModule,
    QuangCardsModule,
    TranslocoModule,
    ReactiveFormsModule,
    InputTextModule,
    InputEmailModule,
    InputDateModule,
    InputTelModule,
    InputCheckboxModule,
    PaginatorModule
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'accessibility'
    }
  ]
})
export class AccessibilityModule {}

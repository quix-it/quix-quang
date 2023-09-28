import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ReactiveFormsModule } from '@angular/forms'
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco'

import {
  QuangCardsModule,
  QuangInputCheckboxModule,
  QuangInputDateModule,
  QuangInputEmailModule,
  QuangInputTelModule,
  QuangInputTextModule,
  QuangPaginatorModule
} from '@quix/quang/components'

import { SharedModule } from '../../shared/shared.module'
import { AccessibilityRoutingModule } from './accessibility-routing.module'
import { FormComponent } from './form/form.component'
import { MasterComponent } from './master/master.component'

@NgModule({
  declarations: [FormComponent, MasterComponent],
  imports: [
    CommonModule,
    AccessibilityRoutingModule,
    SharedModule,
    TranslocoModule,
    ReactiveFormsModule,
    QuangCardsModule,
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

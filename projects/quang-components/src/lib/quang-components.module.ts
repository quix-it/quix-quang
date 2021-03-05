import { NgModule } from '@angular/core';
import { QuixCardComponent } from './quix-card/quix-card.component'
import { QuixCardActionComponent } from './quix-card-action/quix-card-action.component'
import { QuixCardSimpleComponent } from './quix-card-simple/quix-card-simple.component'
import { CommonModule } from '@angular/common'


@NgModule({
  declarations: [
    QuixCardComponent,
    QuixCardActionComponent,
    QuixCardSimpleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuixCardComponent,
    QuixCardActionComponent,
    QuixCardSimpleComponent
  ]
})
export class QuangComponentsModule { }

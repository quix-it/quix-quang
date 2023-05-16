import { NgModule } from '@angular/core'
import { PaginatorComponent } from './paginator.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { QuangPaginatorService } from './paginator.service'
import { PaginatorLanguage } from './paginator.language'
import {
  MatPaginatorIntl,
  MatPaginatorModule
} from '@angular/material/paginator'

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, MatPaginatorModule, TranslocoModule, FormsModule],
  providers: [
    QuangPaginatorService,
    PaginatorLanguage,
    { provide: MatPaginatorIntl, useClass: PaginatorLanguage }
  ],
  exports: [PaginatorComponent]
})
export class QuangPaginatorModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { TranslocoModule } from '@ngneat/transloco'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

import { QuangPaginatorLanguageService } from './paginator-language.service'
import { QuangPaginatorService } from './paginator.service'

import { QuangPaginatorComponent } from './paginator.component'

@NgModule({
  declarations: [QuangPaginatorComponent],
  imports: [CommonModule, PaginationModule, TooltipModule, TranslocoModule, FormsModule],
  providers: [QuangPaginatorService, QuangPaginatorLanguageService],
  exports: [QuangPaginatorComponent]
})
export class QuangPaginatorModule {}

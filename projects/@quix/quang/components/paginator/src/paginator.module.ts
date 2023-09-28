import { NgModule } from '@angular/core'
import { QuangPaginatorComponent } from './paginator.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { QuangPaginatorService } from './paginator.service'
import { QuangPaginatorLanguageService } from './paginator-language.service'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

@NgModule({
  declarations: [QuangPaginatorComponent],
  imports: [
    CommonModule,
    PaginationModule,
    TooltipModule,
    TranslocoModule,
    FormsModule
  ],
  providers: [QuangPaginatorService, QuangPaginatorLanguageService],
  exports: [QuangPaginatorComponent]
})
export class QuangPaginatorModule {}

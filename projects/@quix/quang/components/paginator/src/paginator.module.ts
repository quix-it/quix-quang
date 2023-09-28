import { NgModule } from '@angular/core'
import { PaginatorComponent } from './paginator.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { QuangPaginatorService } from './paginator.service'
import { PaginatorLanguage } from './paginator.language'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    PaginationModule,
    TooltipModule,
    TranslocoModule,
    FormsModule
  ],
  providers: [QuangPaginatorService, PaginatorLanguage],
  exports: [PaginatorComponent]
})
export class QuangPaginatorModule {}

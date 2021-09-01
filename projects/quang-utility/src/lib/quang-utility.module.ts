import { NgModule } from '@angular/core'
import { QuixStorageService } from './quix-storage-service/quix-storage.service'
import { NgxWebstorageModule } from 'ngx-webstorage'
import { QuixValidatorsService } from './quix-validators/quix-validators.service'
import { QuixLayoutService } from './quix-layout/quix-layout.service'

@NgModule({
  declarations: [],
  imports: [
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    QuixStorageService,
    QuixValidatorsService,
    QuixLayoutService
  ],
  exports: []
})
export class QuangUtilityModule { }

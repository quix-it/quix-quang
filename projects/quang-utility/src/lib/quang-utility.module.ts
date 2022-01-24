import { NgModule } from '@angular/core'
import { QuangStorageService } from './quang-storage-service/quang-storage.service'
import { NgxWebstorageModule } from 'ngx-webstorage'
import { QuangValidatorsService } from './quang-validators/quang-validators.service'
import { QuangLayoutService } from './quang-layout/quang-layout.service'

@NgModule({
  declarations: [],
  imports: [
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    QuangStorageService,
    QuangValidatorsService,
    QuangLayoutService
  ],
  exports: []
})
export class QuangUtilityModule { }

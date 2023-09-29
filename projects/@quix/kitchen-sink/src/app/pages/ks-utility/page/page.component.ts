import { Component } from '@angular/core'

import { Observable } from 'rxjs'

import { QuangPageService } from '@quix/quang/utility'

@Component({
  selector: 'ks-page',
  templateUrl: './page.component.html',
  styles: []
})
export class PageComponent {
  status: string = this.page.getPageState()
  freeze$: Observable<any> = this.page.observePageFreeze()
  resume$: Observable<any> = this.page.observePageResume()

  constructor(private readonly page: QuangPageService) {}
}

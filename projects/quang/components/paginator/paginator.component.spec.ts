import { Component, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangPaginatorComponent } from './paginator.component'

describe('QuangPaginatorComponent', () => {
  it('should be defined', () => {
    expect(QuangPaginatorComponent).toBeDefined()
  })
})

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({
      'quangPaginator.pageRange': '{{page}} di {{amountPages}}',
      'quangPaginator.totalItems': 'Totale',
      'quangPaginator.size': 'Dimensione',
    })
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: {
      availableLangs: ['it'],
      defaultLang: 'it',
      fallbackLang: 'it',
      prodMode: true,
    },
    loader: TestTranslocoLoader,
  })

// Host that never rewrites `page` after `changePage`: the server-side pagination
// case, and the window in which the data call is still in flight.
@Component({
  template: `
    <quang-paginator
      [page]="page"
      [pageSize]="pageSize"
      [totalItems]="totalItems"
    />
  `,
  standalone: true,
  imports: [QuangPaginatorComponent],
})
class PassiveHostComponent {
  page = 1
  pageSize = 10
  totalItems = 50
}

describe('QuangPaginatorComponent', () => {
  describe('Page shown and buttons read the same source', () => {
    let fixture: ComponentFixture<PassiveHostComponent>

    const pageRangeLabel = (): string =>
      fixture.nativeElement.querySelector('.pagination-label.text-center').textContent.trim()

    const navigationButtons = (): NodeListOf<HTMLButtonElement> =>
      fixture.nativeElement.querySelectorAll('.pagination button')

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PassiveHostComponent],
        providers: [getTranslocoTestingProviders()],
      }).compileComponents()

      fixture = TestBed.createComponent(PassiveHostComponent)
      fixture.detectChanges()
    })

    it('should display the page the buttons moved to when the caller does not rewrite the page input', () => {
      expect(pageRangeLabel()).toBe('1 di 5')

      // Next page.
      navigationButtons()[2].click()
      fixture.detectChanges()

      // The buttons moved to the new page: "previous" is no longer disabled.
      expect(navigationButtons()[1].disabled).toBe(false)

      expect(pageRangeLabel()).toBe('2 di 5')
    })
  })
})

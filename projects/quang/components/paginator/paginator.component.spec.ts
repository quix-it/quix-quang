import { Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangPaginatorComponent } from './paginator.component'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: {
      availableLangs: ['en'],
      defaultLang: 'en',
      fallbackLang: 'en',
      prodMode: true,
    },
    loader: TestTranslocoLoader,
  })

describe('QuangPaginatorComponent', () => {
  it('should be defined', () => {
    expect(QuangPaginatorComponent).toBeDefined()
  })

  describe('page size label', () => {
    let fixture: ComponentFixture<QuangPaginatorComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [QuangPaginatorComponent],
        providers: [getTranslocoTestingProviders()],
      }).compileComponents()

      fixture = TestBed.createComponent(QuangPaginatorComponent)
      fixture.componentRef.setInput('componentId', 'paginator-test')
      fixture.componentRef.setInput('page', 1)
      fixture.componentRef.setInput('pageSize', 10)
      fixture.componentRef.setInput('totalItems', 100)
      fixture.componentRef.setInput('sizeList', [10, 20, 50])
      fixture.detectChanges()
    })

    it('should associate the page size label with the rendered page size select', () => {
      const host: HTMLElement = fixture.nativeElement
      const label = host.querySelector('label')
      const select = host.querySelector('select')

      expect(label).not.toBeNull()
      expect(select).not.toBeNull()

      expect(host.querySelector(`#${label!.htmlFor}`)).toBe(select)
    })
  })
})

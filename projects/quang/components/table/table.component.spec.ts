import { Component, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangTableComponent, TableConfiguration } from './table.component'

describe('QuangTableComponent', () => {
  it('should be defined', () => {
    expect(QuangTableComponent).toBeDefined()
  })

  // TODO: Add tests with ResizeObservableService
})

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

@Component({
  template: `<quang-table [tableConfigurations]="config" />`,
  standalone: true,
  imports: [QuangTableComponent],
})
class CellPropertiesHostComponent {
  // The header cells go through `$safeNavigationMigration`, an unresolved Angular
  // migration artifact that is defined nowhere and is unrelated to this ticket.
  // Rows render on their own, so these cases use a table with no headers.
  config: TableConfiguration<unknown> = {
    headers: [],
    rows: [{ rowId: 'row-1', cellData: [{ text: 'cell text' }] }],
  }

  setCellProperties(properties: Record<string, unknown>): void {
    this.config = {
      headers: [],
      rows: [{ rowId: 'row-1', cellData: [{ text: 'cell text', properties }] }],
    }
  }
}

describe('QuangTableComponent cell properties', () => {
  let fixture: ComponentFixture<CellPropertiesHostComponent>
  let host: CellPropertiesHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPropertiesHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(CellPropertiesHostComponent)
    host = fixture.componentInstance
  })

  const render = async (): Promise<void> => {
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
  }

  // Referto QUANG-282: "Chi passa `properties` con una chiave come `innerHTML` o `outerHTML`
  // scrive markup nel documento senza passare dalla sanificazione di Angular"
  it('should not write markup in the document when properties carries an innerHTML key', async () => {
    host.setCellProperties({ innerHTML: '<span class="injected-markup">boom</span>' })

    await render()

    expect(fixture.nativeElement.querySelector('.injected-markup')).toBeNull()
  })

  // Referto QUANG-282: "Chi passa `properties` con una chiave come `innerHTML` o `outerHTML`
  // scrive markup nel documento senza passare dalla sanificazione di Angular"
  it('should not write markup in the document when properties carries an outerHTML key', async () => {
    host.setCellProperties({ outerHTML: '<td class="replaced-cell">boom</td>' })

    await render()

    expect(fixture.nativeElement.querySelector('.replaced-cell')).toBeNull()
  })
})

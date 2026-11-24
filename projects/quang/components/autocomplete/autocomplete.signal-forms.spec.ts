import { Component, Injectable, signal, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormField, form } from '@angular/forms/signals'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangAutocompleteComponent } from './autocomplete.component'
import { SelectOption } from 'quang/components/shared'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
    loader: TestTranslocoLoader,
  })

const options: SelectOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

@Component({
  template: `<quang-autocomplete
    [formField]="testForm.value"
    [selectOptions]="options"
  />`,
  imports: [FormField, QuangAutocompleteComponent],
})
class SingleHostComponent {
  autocomplete = viewChild.required(QuangAutocompleteComponent)
  options = options
  model = signal({ value: null as string | null })
  testForm = form(this.model)
}

@Component({
  template: `<quang-autocomplete
    [formField]="testForm.value"
    [multiple]="true"
    [selectOptions]="options"
  />`,
  imports: [FormField, QuangAutocompleteComponent],
})
class MultipleHostComponent {
  autocomplete = viewChild.required(QuangAutocompleteComponent)
  options = options
  model = signal({ value: [] as string[] })
  testForm = form(this.model)
}

describe('QuangAutocompleteComponent + signal forms [formField]', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ providers: [getTranslocoTestingProviders()] }).compileComponents()
  })

  describe('single', () => {
    let fixture: ComponentFixture<SingleHostComponent>

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleHostComponent)
    })

    it('mounts without throwing', () => {
      expect(() => fixture.detectChanges()).not.toThrow()
    })

    it('syncs the value both ways', () => {
      fixture.detectChanges()
      const host = fixture.componentInstance

      host.model.set({ value: 'opt2' })
      fixture.detectChanges()
      expect(host.autocomplete()._value()).toBe('opt2')

      host.autocomplete().onValueChange('opt3')
      fixture.detectChanges()
      expect(host.model().value).toBe('opt3')
    })
  })

  describe('multiple', () => {
    let fixture: ComponentFixture<MultipleHostComponent>
    let host: MultipleHostComponent

    beforeEach(() => {
      fixture = TestBed.createComponent(MultipleHostComponent)
      fixture.detectChanges()
      host = fixture.componentInstance
    })

    it('adds chips chosen by the user to the model', () => {
      host.autocomplete().onValueChange('opt1')
      host.autocomplete().onValueChange('opt2')
      fixture.detectChanges()

      expect(host.model().value).toEqual(['opt1', 'opt2'])
      expect(
        host
          .autocomplete()
          ._selectedOptions()
          .map((o) => o.value)
      ).toEqual(['opt1', 'opt2'])
    })

    it('removes a chip deleted by the user from the model and the selected options', () => {
      host.autocomplete().onValueChange('opt1')
      host.autocomplete().onValueChange('opt2')
      host.autocomplete().deleteChip('opt1')
      fixture.detectChanges()

      expect(host.model().value).toEqual(['opt2'])
      expect(host.autocomplete()._chipList()).toEqual(['opt2'])
      expect(
        host
          .autocomplete()
          ._selectedOptions()
          .map((o) => o.value)
      ).toEqual(['opt2'])
    })

    it('drops chips when the model shrinks from outside', () => {
      host.model.set({ value: ['opt1', 'opt2'] })
      fixture.detectChanges()
      expect(host.autocomplete()._chipList()).toEqual(['opt1', 'opt2'])

      host.model.set({ value: ['opt1'] })
      fixture.detectChanges()
      expect(host.autocomplete()._chipList()).toEqual(['opt1'])
      expect(
        host
          .autocomplete()
          ._selectedOptions()
          .map((o) => o.value)
      ).toEqual(['opt1'])
    })

    it('clears chips when the model is reset to an empty list', () => {
      host.model.set({ value: ['opt1', 'opt2'] })
      fixture.detectChanges()

      host.model.set({ value: [] })
      fixture.detectChanges()
      expect(host.autocomplete()._chipList()).toEqual([])
      expect(host.autocomplete()._selectedOptions()).toEqual([])
    })
  })
})

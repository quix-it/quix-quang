import { Component, Injectable, TemplateRef, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangRadioGroupComponent, QuangRadioOptionTemplateContext, RadioOption } from './radio-group.component'

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
  template: `
    <form [formGroup]="form">
      <ng-template
        #optTpl
        let-opt
        let-selected="selected"
      >
        <span class="custom-opt">Custom {{ opt.value }} {{ selected }}</span>
      </ng-template>

      <quang-radio-group
        [radioOptions]="options"
        [radioPosition]="radioPosition"
        formControlName="choice"
      />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangRadioGroupComponent],
})
class TestHostComponent {
  @ViewChild('optTpl', { read: TemplateRef })
  optTpl?: TemplateRef<QuangRadioOptionTemplateContext>

  form = new FormGroup({
    choice: new FormControl<string | null>(null),
  })

  radioPosition: 'left' | 'right' = 'left'

  options: RadioOption<string>[] = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
  ]

  setTemplatedOptions(): void {
    this.options = [
      { label: 'A', value: 'A' },
      { value: 'B', renderer: this.optTpl },
    ]
  }
}

describe('QuangRadioGroupComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let host: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    host = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be defined', () => {
    expect(QuangRadioGroupComponent).toBeDefined()
  })

  it('should update form control on selection', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(inputs.length).toBe(2)

    inputs[1].click()
    inputs[1].dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(host.form.get('choice')?.value).toBe('B')
  })

  it('should disable all radios when form control is disabled', () => {
    host.form.get('choice')?.disable()
    fixture.detectChanges()

    const inputs = fixture.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(Array.from(inputs).every((i) => i.disabled)).toBe(true)
  })

  it('should render option renderer when provided', () => {
    host.setTemplatedOptions()
    fixture.detectChanges()

    const custom = fixture.nativeElement.querySelector('.custom-opt') as HTMLElement | null
    expect(custom).toBeTruthy()
    expect(custom?.textContent).toContain('Custom B')
  })

  it('should support radioPosition="right"', () => {
    host.radioPosition = 'right'
    fixture.detectChanges()

    const wrapper = fixture.nativeElement.querySelector('.form-check') as HTMLElement
    expect(wrapper.classList.contains('form-check-reverse')).toBe(true)
  })
})

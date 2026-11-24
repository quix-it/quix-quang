import { Component, Injectable, signal, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormField, form, required } from '@angular/forms/signals'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangWysiwygComponent } from './wysiwyg.component'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

@Component({
  template: `<quang-wysiwyg [formField]="testForm.body" />`,
  imports: [FormField, QuangWysiwygComponent],
})
class SignalFormsHostComponent {
  wysiwyg = viewChild.required(QuangWysiwygComponent)
  model = signal({ body: '' })
  testForm = form(this.model, (p) => required(p.body))
}

describe('QuangWysiwygComponent + signal forms [formField]', () => {
  let fixture: ComponentFixture<SignalFormsHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideTransloco({
          config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
          loader: TestTranslocoLoader,
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SignalFormsHostComponent)
    fixture.detectChanges()
  })

  it('accepts markup-only content on a required field without throwing', () => {
    const host = fixture.componentInstance

    expect(() => host.wysiwyg().onChangedHandler('<div><br></div>')).not.toThrow()
    expect(host.model().body).toBe('<div><br></div>')
  })

  it('writes real content to the model', () => {
    const host = fixture.componentInstance

    host.wysiwyg().onChangedHandler('<div>hello</div>')
    fixture.detectChanges()

    expect(host.model().body).toBe('<div>hello</div>')
    expect(host.testForm.body().valid()).toBe(true)
  })
})

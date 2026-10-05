import { Component, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { By } from '@angular/platform-browser'

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
  template: `
    <form [formGroup]="form">
      <quang-wysiwyg formControlName="content" />
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, QuangWysiwygComponent],
})
class TestHostComponent {
  form = new FormGroup({
    content: new FormControl<string>('<p></p>', { nonNullable: true, validators: [Validators.required] }),
  })
}

describe('QuangWysiwygComponent', () => {
  it('should be defined', () => {
    expect(QuangWysiwygComponent).toBeDefined()
  })

  describe('required validation', () => {
    let fixture: ComponentFixture<TestHostComponent>
    let host: TestHostComponent

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [
          provideTransloco({
            config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
            loader: TestTranslocoLoader,
          }),
        ],
      }).compileComponents()

      fixture = TestBed.createComponent(TestHostComponent)
      host = fixture.componentInstance
      fixture.detectChanges()
      await fixture.whenStable()
    })

    it('should mark a required control as missing when its initial value contains only tags', () => {
      const control = host.form.controls.content

      expect(control.hasError('required')).toBe(true)
      expect(control.invalid).toBe(true)
    })

    it('should keep the required error after the control is revalidated', () => {
      const control = host.form.controls.content
      const wysiwyg = fixture.debugElement.query(By.directive(QuangWysiwygComponent))
        .componentInstance as QuangWysiwygComponent

      wysiwyg.onChangedHandler('<div><br></div>')
      control.updateValueAndValidity()

      expect(control.hasError('required')).toBe(true)
      expect(control.invalid).toBe(true)
    })
  })
})

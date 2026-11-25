import { Component, Injectable, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'

import { QuangWysiwygComponent } from './wysiwyg.component'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

@Component({
  template: `<quang-wysiwyg [formControl]="control" />`,
  imports: [ReactiveFormsModule, QuangWysiwygComponent],
})
class ReactiveHostComponent {
  wysiwyg = viewChild.required(QuangWysiwygComponent)
  control = new FormControl('<div>hello</div>', Validators.required)
}

describe('QuangWysiwygComponent', () => {
  it('should be defined', () => {
    expect(QuangWysiwygComponent).toBeDefined()
  })

  describe('reactive forms required', () => {
    function setup(control?: FormControl<string | null>) {
      TestBed.configureTestingModule({
        providers: [
          provideTransloco({
            config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
            loader: TestTranslocoLoader,
          }),
        ],
      })
      const fixture = TestBed.createComponent(ReactiveHostComponent)
      if (control) fixture.componentInstance.control = control
      fixture.detectChanges()
      return fixture.componentInstance
    }

    it('marks a required control invalid when the user empties the editor to markup only', () => {
      const host = setup()

      host.wysiwyg().onChangedHandler('<div><br></div>')

      expect(host.control.value).toBe('<div><br></div>')
      expect(host.control.hasError('required')).toBe(true)
    })

    it('marks a required control invalid when its initial value is markup only', () => {
      const host = setup(new FormControl('<div><br></div>', Validators.required))

      expect(host.control.hasError('required')).toBe(true)
    })

    it('keeps a non-required control valid with markup-only content', () => {
      const host = setup(new FormControl('<div>hello</div>'))

      host.wysiwyg().onChangedHandler('<div><br></div>')

      expect(host.control.valid).toBe(true)
    })
  })
})

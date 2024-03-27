import { JsonPipe, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterOutlet } from '@angular/router'

import { QuangInputComponent } from '@quix/quang/components/input'
import { QuangTranslationModule, QuangTranslationService } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    QuangInputComponent,
    FormsModule,
    ReactiveFormsModule,
    QuangTranslationModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'playground'

  quangTranslationService = signal(inject(QuangTranslationService))

  formBuilder = signal(inject(NonNullableFormBuilder))

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required'
    },
    {
      error: Validators.minLength.name,
      message: 'form.errors.minLength'
    },
    {
      error: Validators.maxLength.name,
      message: 'form.errors.maxLength'
    }
  ])

  testForm = signal(
    this.formBuilder().group({
      testInput: this.formBuilder().control<string>('no pirrone!', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30)
      ])
    })
  )
  showInput = signal(true)

  changeFormEnabled() {
    if (this.testForm().enabled) this.testForm().disable()
    else this.testForm().enable()
  }

  getIsRequiredInput() {
    return this.testForm().controls.testInput.hasValidator(Validators.required)
  }

  changeFormInputRequired() {
    if (this.getIsRequiredInput()) {
      this.testForm().controls.testInput.removeValidators(Validators.required)
    } else {
      this.testForm().controls.testInput.addValidators(Validators.required)
    }
    this.testForm().controls.testInput.updateValueAndValidity()
  }

  changeLanguage(lang: string) {
    this.quangTranslationService().setActiveLang(lang)
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testForm.set(
      this.formBuilder().group({
        testInput: this.formBuilder().control<string>('no pirrone rigenerato!', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(30)
        ])
      })
    )
  }
}

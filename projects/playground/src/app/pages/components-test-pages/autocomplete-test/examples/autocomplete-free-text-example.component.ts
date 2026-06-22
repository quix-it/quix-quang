import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-free-text-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, TranslocoPipe],
  template: `
    <quang-autocomplete
      [allowFreeText]="true"
      [componentLabel]="'examples.autocomplete.freeText.label' | transloco"
      [componentPlaceholder]="'examples.autocomplete.freeText.placeholder' | transloco"
      [formControl]="control"
      [internalFilterOptions]="true"
      [selectOptions]="options()"
    />
    <p class="mt-2 text-muted small">
      {{ 'examples.autocomplete.freeText.value' | transloco }}:
      {{ control.value ?? ('examples.autocomplete.freeText.none' | transloco) }}
      <span
        [class.bg-info]="!isFromList() && control.value"
        [class.bg-success]="isFromList()"
        class="ms-2 badge"
      >
        {{
          isFromList()
            ? ('examples.autocomplete.freeText.fromList' | transloco)
            : control.value
              ? ('examples.autocomplete.freeText.customText' | transloco)
              : ''
        }}
      </span>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteFreeTextExampleComponent {
  control = new FormControl<string | null>(null, [Validators.required])

  options = signal<SelectOption[]>([
    { label: 'Angular', value: 'Angular' },
    { label: 'React', value: 'React' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Svelte', value: 'Svelte' },
    { label: 'Ember', value: 'Ember' },
    { label: 'Backbone', value: 'Backbone' },
  ])

  isFromList(): boolean {
    return this.options().some((opt) => opt.value === this.control.value)
  }
}

// Code snippets for example viewer
export const AUTOCOMPLETE_FREE_TEXT_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-free-text',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  templateUrl: './autocomplete-free-text.component.html',
})
export class AutocompleteFreeTextComponent {
  control = new FormControl<string | null>(null)

  options = signal<SelectOption[]>([
    { label: 'Angular', value: 'Angular' },
    { label: 'React', value: 'React' },
    { label: 'Vue', value: 'Vue' },
    // ... more options
  ])
}`

export const AUTOCOMPLETE_FREE_TEXT_HTML = `<!-- Users can type any value OR select from suggestions -->
<quang-autocomplete
  [allowFreeText]="true"
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  componentLabel="Enter or select a tag"
  componentPlaceholder="Type a custom tag or select from list..."
  [formControl]="control"
/>`

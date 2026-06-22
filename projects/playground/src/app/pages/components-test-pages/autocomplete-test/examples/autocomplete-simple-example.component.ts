import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-simple-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, TranslocoPipe],
  template: `
    <quang-autocomplete
      [componentLabel]="'examples.autocomplete.simple.label' | transloco"
      [formControl]="control"
      [internalFilterOptions]="true"
      [selectOptions]="options()"
    />
    <p class="mt-2 text-muted small">
      {{ 'examples.autocomplete.simple.selectedValue' | transloco }}:
      {{ control.value ?? ('examples.autocomplete.simple.none' | transloco) }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSimpleExampleComponent {
  control = new FormControl<string | null>(null)

  options = signal<SelectOption[]>([
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Spain', value: 'ES' },
    { label: 'Portugal', value: 'PT' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Austria', value: 'AT' },
    { label: 'Switzerland', value: 'CH' },
  ])
}

// Code snippets for example viewer
export const AUTOCOMPLETE_SIMPLE_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-simple',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  template: \`
    <quang-autocomplete
      [internalFilterOptions]="true"
      [selectOptions]="options()"
      componentLabel="Select a country"
      [formControl]="control"
    />
  \`,
})
export class AutocompleteSimpleComponent {
  control = new FormControl<string | null>(null)

  options = signal<SelectOption[]>([
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    // ... more options
  ])
}`

export const AUTOCOMPLETE_SIMPLE_HTML = `<quang-autocomplete
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  componentLabel="Select a country"
  [formControl]="control"
/>`

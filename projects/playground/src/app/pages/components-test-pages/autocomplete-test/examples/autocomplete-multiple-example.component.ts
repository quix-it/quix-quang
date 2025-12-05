import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-multiple-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, JsonPipe, TranslocoPipe],
  template: `
    <div class="row">
      <div class="col-6">
        <quang-autocomplete
          [componentLabel]="'examples.autocomplete.multiple.labelVertical' | transloco"
          [formControl]="controlVertical"
          [internalFilterOptions]="true"
          [multiple]="true"
          [selectOptions]="options()"
          multiSelectDisplayMode="vertical"
        />
        <p class="mt-2 text-muted small">
          {{ 'examples.autocomplete.multiple.selected' | transloco }}: {{ controlVertical.value | json }}
        </p>
      </div>
      <div class="col-6">
        <quang-autocomplete
          [componentLabel]="'examples.autocomplete.multiple.labelHorizontal' | transloco"
          [formControl]="controlHorizontal"
          [internalFilterOptions]="true"
          [multiple]="true"
          [selectOptions]="options()"
          multiSelectDisplayMode="horizontal"
        />
        <p class="mt-2 text-muted small">
          {{ 'examples.autocomplete.multiple.selected' | transloco }}: {{ controlHorizontal.value | json }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteMultipleExampleComponent {
  controlVertical = new FormControl<string[]>([])
  controlHorizontal = new FormControl<string[]>([])

  options = signal<SelectOption[]>([
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'PHP', value: 'php' },
    { label: 'Swift', value: 'swift' },
  ])
}

// Code snippets for example viewer
export const AUTOCOMPLETE_MULTIPLE_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-multiple',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  templateUrl: './autocomplete-multiple.component.html',
})
export class AutocompleteMultipleComponent {
  // Multiple selection returns an array
  control = new FormControl<string[]>([])

  options = signal<SelectOption[]>([
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    // ... more options
  ])
}`

export const AUTOCOMPLETE_MULTIPLE_HTML = `<!-- Vertical display mode -->
<quang-autocomplete
  [multiple]="true"
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  componentLabel="Select technologies"
  multiSelectDisplayMode="vertical"
  [formControl]="control"
/>

<!-- Horizontal display mode -->
<quang-autocomplete
  [multiple]="true"
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  componentLabel="Select technologies"
  multiSelectDisplayMode="horizontal"
  [formControl]="control"
/>`

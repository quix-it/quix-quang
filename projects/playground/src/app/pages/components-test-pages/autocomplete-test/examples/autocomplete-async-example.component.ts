import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-async-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, TranslocoPipe],
  template: `
    <quang-autocomplete
      [componentLabel]="'examples.autocomplete.async.label' | transloco"
      [componentPlaceholder]="'examples.autocomplete.async.placeholder' | transloco"
      [formControl]="control"
      [searchTextDebounce]="300"
      [selectOptions]="filteredOptions()"
      (searchTextChange)="onSearchTextChange($event)"
    />
    <p class="mt-2 text-muted small">
      {{ 'examples.autocomplete.async.selectedValue' | transloco }}:
      {{ control.value ?? ('examples.autocomplete.async.none' | transloco) }}
      @if (isLoading()) {
        <span class="ms-2">({{ 'examples.autocomplete.async.loading' | transloco }})</span>
      }
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteAsyncExampleComponent {
  control = new FormControl<string | null>(null)

  isLoading = signal<boolean>(false)

  private readonly allOptions: SelectOption[] = [
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
    { label: 'Ireland', value: 'IE' },
    { label: 'Poland', value: 'PL' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Norway', value: 'NO' },
  ]

  filteredOptions = signal<SelectOption[]>([])

  onSearchTextChange(searchText: string): void {
    this.isLoading.set(true)

    // Simulate API call with delay
    setTimeout(() => {
      const filtered = this.allOptions.filter((opt) => opt.label.toLowerCase().includes(searchText.toLowerCase()))
      this.filteredOptions.set(filtered)
      this.isLoading.set(false)
    }, 500)
  }
}

// Code snippets for example viewer
export const AUTOCOMPLETE_ASYNC_TS = `import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-async',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  templateUrl: './autocomplete-async.component.html',
})
export class AutocompleteAsyncComponent {
  control = new FormControl<string | null>(null)
  filteredOptions = signal<SelectOption[]>([])

  onSearchTextChange(searchText: string): void {
    // Fetch options from your API
    this.apiService.searchCountries(searchText)
      .subscribe(options => this.filteredOptions.set(options))
  }
}`

export const AUTOCOMPLETE_ASYNC_HTML = `<quang-autocomplete
  [selectOptions]="filteredOptions()"
  [searchTextDebounce]="300"
  (searchTextChange)="onSearchTextChange($event)"
  componentLabel="Search for a country"
  componentPlaceholder="Start typing to search..."
  [formControl]="control"
/>`

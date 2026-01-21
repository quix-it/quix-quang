import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-disabled-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      componentLabel="Tabs with disabled option"
    />
    <div class="mt-3 p-3 bg-light rounded">
      <p class="mb-0">
        <strong>{{ 'examples.tabs.disabled.selectedTab' | transloco }}:</strong>
        {{ control.value }}
      </p>
      <p class="mb-0 text-muted small mt-1">
        {{ 'examples.tabs.disabled.info' | transloco }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDisabledExampleComponent {
  control = new FormControl<string>('tab1')

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'examples.tabs.disabled.tab1' },
    { id: 'tab2', label: 'examples.tabs.disabled.tab2', disabled: true },
    { id: 'tab3', label: 'examples.tabs.disabled.tab3' },
  ]
}

// Code snippets for example viewer
export const TABS_DISABLED_TS = `import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-disabled',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      componentLabel="Tabs with disabled option"
    />
  \`,
})
export class TabsDisabledComponent {
  control = new FormControl<string>('tab1')

  tabs: TabConfiguration[] = [
    { id: 'tab1', label: 'Enabled Tab' },
    { id: 'tab2', label: 'Disabled Tab', disabled: true },
    { id: 'tab3', label: 'Another Tab' },
  ]
}`

export const TABS_DISABLED_HTML = `<quang-tabs
  [tabs]="tabs"
  [formControl]="control"
  componentLabel="Tabs with disabled option"
/>`

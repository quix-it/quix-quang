import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-simple-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <quang-tabs
      [formControl]="control"
      [tabs]="tabs"
      componentLabel="Select a tab"
    />
    <div class="mt-3 p-3 bg-light rounded">
      <p class="mb-0">
        <strong>{{ 'examples.tabs.simple.selectedTab' | transloco }}:</strong>
        {{ control.value ?? ('examples.tabs.simple.none' | transloco) }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsSimpleExampleComponent {
  control = new FormControl<string>('home')

  tabs: TabConfiguration[] = [
    { id: 'home', label: 'examples.tabs.simple.home' },
    { id: 'profile', label: 'examples.tabs.simple.profile' },
    { id: 'settings', label: 'examples.tabs.simple.settings' },
  ]
}

// Code snippets for example viewer
export const TABS_SIMPLE_TS = `import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-simple',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      componentLabel="Select a tab"
    />
  \`,
})
export class TabsSimpleComponent {
  control = new FormControl<string>('home')

  tabs: TabConfiguration[] = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
  ]
}`

export const TABS_SIMPLE_HTML = `<quang-tabs
  [tabs]="tabs"
  [formControl]="control"
  componentLabel="Select a tab"
/>`

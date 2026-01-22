import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'playground-tabs-events-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangTabsComponent, TranslocoPipe],
  template: `
    <quang-tabs
      [formControl]="control"
      [tabs]="tabs"
      (tabChange)="onTabChange($event)"
      componentLabel="Tabs with event handling"
    />
    <div class="mt-3 p-3 bg-light rounded">
      <p class="mb-1">
        <strong>{{ 'examples.tabs.events.formValue' | transloco }}:</strong>
        {{ control.value }}
      </p>
      <p class="mb-1">
        <strong>{{ 'examples.tabs.events.lastEvent' | transloco }}:</strong>
        {{ lastTabChangeEvent ?? ('examples.tabs.events.none' | transloco) }}
      </p>
      <p class="mb-0">
        <strong>{{ 'examples.tabs.events.clickCount' | transloco }}:</strong>
        {{ clickCount }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsEventsExampleComponent {
  control = new FormControl<string>('overview')
  lastTabChangeEvent: string | null = null
  clickCount = 0

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'examples.tabs.events.overview' },
    { id: 'details', label: 'examples.tabs.events.details' },
    { id: 'analytics', label: 'examples.tabs.events.analytics' },
  ]

  onTabChange(tabId: string): void {
    this.lastTabChangeEvent = tabId
    this.clickCount++
  }
}

// Code snippets for example viewer
export const TABS_EVENTS_TS = `import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs'

@Component({
  selector: 'app-tabs-events',
  imports: [ReactiveFormsModule, QuangTabsComponent],
  template: \`
    <quang-tabs
      [tabs]="tabs"
      [formControl]="control"
      (tabChange)="onTabChange($event)"
      componentLabel="Tabs with event handling"
    />
    <p>Last event: {{ lastTabChangeEvent }}</p>
  \`,
})
export class TabsEventsComponent {
  control = new FormControl<string>('overview')
  lastTabChangeEvent: string | null = null

  tabs: TabConfiguration[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'analytics', label: 'Analytics' },
  ]

  onTabChange(tabId: string): void {
    this.lastTabChangeEvent = tabId
    console.log('Tab changed to:', tabId)
  }
}`

export const TABS_EVENTS_HTML = `<quang-tabs
  [tabs]="tabs"
  [formControl]="control"
  (tabChange)="onTabChange($event)"
  componentLabel="Tabs with event handling"
/>`

import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, forwardRef, input, output } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangBaseComponent } from 'quang/components/shared'

export interface TabConfiguration {
  id: string
  label: string
  disabled?: boolean
  renderer?: TemplateRef<any>
}

@Component({
  selector: 'quang-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuangTabsComponent),
      multi: true,
    },
  ],
  imports: [TranslocoPipe, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuangTabsComponent extends QuangBaseComponent<string> {
  tabs = input.required<TabConfiguration[]>()

  tabChange = output<string>()

  getTabIndex(tab: TabConfiguration): number {
    return this.tabs().findIndex((x) => x.id === tab.id)
  }

  isTabSelected(tab: TabConfiguration): boolean {
    return this._value() === tab.id
  }

  isTabDisabled(tab: TabConfiguration): boolean {
    return this._isDisabled() || this.isReadonly() || !!tab.disabled
  }

  onSelectTab(tab: TabConfiguration): void {
    if (this.isTabDisabled(tab)) return
    this.onChangedHandler(tab.id)
    this.tabChange.emit(tab.id)
  }
}

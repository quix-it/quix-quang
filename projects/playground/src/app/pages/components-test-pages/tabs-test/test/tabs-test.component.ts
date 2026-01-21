import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



import { TranslocoPipe } from '@jsverse/transloco';



import { QuangTabsComponent, TabConfiguration } from 'quang/components/tabs';





@Component({
  selector: 'playground-tabs-test',
  imports: [JsonPipe, ReactiveFormsModule, TranslocoPipe, QuangTabsComponent],
  templateUrl: './tabs-test.component.html',
  styleUrl: './tabs-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsTestComponent {
  private readonly customTabTpl = viewChild<TemplateRef<any>>('customTabTpl')

  formBuilder = inject(NonNullableFormBuilder)

  errors = signal([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  isReadonly = signal<boolean>(false)
  lastTabChangeEvent = signal<string | null>(null)

  testForm = this.formBuilder.group({
    selectedTab: this.formBuilder.control<string>('tab1', [Validators.required]),
  })

  standardTabs = computed<TabConfiguration[]>(() => [
    { id: 'tab1', label: 'examples.tabs.tab1' },
    { id: 'tab2', label: 'examples.tabs.tab2' },
    { id: 'tab3', label: 'examples.tabs.tab3', disabled: true },
  ])

  customTabs = computed<TabConfiguration[]>(() => [
    { id: 'custom1', label: 'examples.tabs.custom1' },
    {
      id: 'custom2',
      label: 'examples.tabs.custom2',
      renderer: this.customTabTpl(),
    },
    { id: 'custom3', label: 'examples.tabs.custom3' },
  ])

  toggleDisabled(): void {
    if (this.testForm.enabled) this.testForm.disable()
    else this.testForm.enable()
  }

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }

  onTabChange(tabId: string): void {
    this.lastTabChangeEvent.set(tabId)
  }

  resetForm(): void {
    this.testForm.reset()
    this.lastTabChangeEvent.set(null)
  }
}

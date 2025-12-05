import { Clipboard } from '@angular/cdk/clipboard'
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'

@Component({
  selector: 'playground-example-viewer',
  standalone: true,
  imports: [AngularSvgIconModule, TranslocoPipe],
  templateUrl: './example-viewer.component.html',
  styleUrl: './example-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleViewerComponent {
  private readonly clipboard = inject(Clipboard)

  // ==================== INPUTS ====================
  /**
   * Title of the example
   */
  title = input.required<string>()

  /**
   * Description of what the example demonstrates
   */
  description = input<string>('')

  /**
   * The TypeScript code to display
   */
  tsCode = input<string>('')

  /**
   * The HTML code to display
   */
  htmlCode = input<string>('')

  // ==================== PROTECTED STATE ====================
  protected activeTab = signal<'result' | 'ts' | 'html'>('result')
  protected copyTooltip = signal<string>('Copy code')

  // ==================== COMPUTED ====================
  protected hasTsCode = computed(() => this.tsCode().trim().length > 0)
  protected hasHtmlCode = computed(() => this.htmlCode().trim().length > 0)
  protected showCodeTabs = computed(() => this.hasTsCode() || this.hasHtmlCode())

  // ==================== PROTECTED METHODS ====================
  protected setActiveTab(tab: 'result' | 'ts' | 'html'): void {
    this.activeTab.set(tab)
  }

  protected copyCode(): void {
    const code = this.activeTab() === 'ts' ? this.tsCode() : this.htmlCode()
    this.clipboard.copy(code)
    this.copyTooltip.set('Copied!')
    setTimeout(() => this.copyTooltip.set('Copy code'), 2000)
  }
}

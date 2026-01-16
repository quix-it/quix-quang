import { Clipboard } from '@angular/cdk/clipboard'
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import * as Prism from 'prismjs'

import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-typescript'

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

  protected highlightedTs = computed(() => {
    const code = this.tsCode()
    const grammar = Prism.languages['typescript']
    if (!code || !grammar) return this.escapeHtml(code)
    return Prism.highlight(code, grammar, 'typescript')
  })

  protected highlightedHtml = computed(() => {
    const code = this.htmlCode()
    const grammar = Prism.languages['markup']
    if (!code || !grammar) return this.escapeHtml(code)
    return Prism.highlight(code, grammar, 'markup')
  })

  private escapeHtml(code: string): string {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

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

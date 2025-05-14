import { CommonModule, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective, NgTemplateOutlet],
})
export class NetworkComponent {
  buttonTooltip = signal<string>('utils.copyContent')

  networkFunctions = [
    {
      functionName: 'isHttpMethod',
      import: "import { isHttpMethod } from 'quang/shared/intercept-utils';",
      exampleUsage: `isHttpMethod('POST'); // true\nisHttpMethod('FOO'); // false`,
      explanationKey: 'network.functions.isHttpMethod',
    },
    {
      functionName: 'getExcludedUrlsByMethod',
      import: "import { getExcludedUrlsByMethod } from 'quang/shared/intercept-utils';",
      exampleUsage: `getExcludedUrlsByMethod([
  { url: '/api/foo', method: 'GET' },
  { url: '/api/bar', method: 'POST' }
]);`,
      explanationKey: 'network.functions.getExcludedUrlsByMethod',
    },
  ]

  copyToClipboard(importText: string, exampleUsage: string): void {
    navigator.clipboard.writeText(`${importText}\n${exampleUsage}`)
    this.buttonTooltip.set('utils.copied')
    setTimeout(() => {
      this.buttonTooltip.set('utils.copyContent')
    }, 2000)
  }
}

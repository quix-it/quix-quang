import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-data-handling',
  templateUrl: './data-handling.component.html',
  styleUrls: ['./data-handling.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective],
})
export class DataHandlingComponent {
  conversionFunctions = [
    {
      functionName: 'blobToBase64',
      import: "import { blobToBase64 } from 'quang/data-handling/conversion';",
      exampleUsage: 'const base64 = await blobToBase64(blob);',
      explanationKey: 'dataHandling.functions.blobToBase64',
    },
    {
      functionName: 'base64ToDataUri',
      import: "import { base64ToDataUri } from 'quang/data-handling/conversion';",
      exampleUsage: "base64ToDataUri(base64, 'image/png');",
      explanationKey: 'dataHandling.functions.base64ToDataUri',
    },
    {
      functionName: 'dataUriToBlob',
      import: "import { dataUriToBlob } from 'quang/data-handling/conversion';",
      exampleUsage: 'const blob = await dataUriToBlob(dataUri);',
      explanationKey: 'dataHandling.functions.dataUriToBlob',
    },
  ]

  copyToClipboard(importText: string, exampleUsage: string): void {
    navigator.clipboard.writeText(`${importText}\n${exampleUsage}`)
  }
}

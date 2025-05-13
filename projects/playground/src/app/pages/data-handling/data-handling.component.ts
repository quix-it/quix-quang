import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-data-handling',
  templateUrl: './data-handling.component.html',
  styleUrls: ['./data-handling.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective, NgTemplateOutlet],
})
export class DataHandlingComponent {
  buttonTooltip = signal<string>('utils.copyContent')
  conversionFunctions = [
    {
      functionName: 'blobToBase64',
      import: "import { blobToBase64 } from 'quang/data-handling/conversion';",
      exampleUsage: 'const base64 = await blobToBase64(blob);',
      explanationKey: 'dataHandling.conversion.functions.blobToBase64',
    },
    {
      functionName: 'base64ToDataUri',
      import: "import { base64ToDataUri } from 'quang/data-handling/conversion';",
      exampleUsage: "base64ToDataUri(base64, 'image/png');",
      explanationKey: 'dataHandling.conversion.functions.base64ToDataUri',
    },
    {
      functionName: 'dataUriToBlob',
      import: "import { dataUriToBlob } from 'quang/data-handling/conversion';",
      exampleUsage: 'const blob = await dataUriToBlob(dataUri);',
      explanationKey: 'dataHandling.conversion.functions.dataUriToBlob',
    },
  ]

  downloadFunctions = [
    {
      functionName: 'downloadFile',
      import: "import { downloadFile } from 'quang/data-handling/download';",
      exampleUsage: "downloadFile(file, 'example.txt');",
      explanationKey: 'dataHandling.download.functions.downloadFile',
    },
    {
      functionName: 'handleDownload',
      import: "import { handleDownload } from 'quang/data-handling/download';",
      exampleUsage: "handleDownload(response, 'csv');",
      explanationKey: 'dataHandling.download.functions.handleDownload',
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

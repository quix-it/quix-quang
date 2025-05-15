import { CommonModule, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

import { ResizeObservableService } from 'quang/device/resize-observable.service'

@Component({
  selector: 'playground-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective, NgTemplateOutlet],
})
export class DeviceComponent {
  buttonTooltip = signal<string>('utils.copyContent')

  private readonly resizeObservable = inject(ResizeObservableService)

  deviceFunctions = [
    {
      functionName: 'resizeObservable',
      import:
        "import { ResizeObservableService } from 'quang/device/resize-observable.service';\nprivate readonly resizeObservable = inject(ResizeObservableService);",
      exampleUsage: 'this.resizeObservable.resizeObservable(element).subscribe(size => console.log(size));',
      explanationKey: 'device.functions.resizeObservable',
    },
    {
      functionName: 'widthResizeObservable',
      import:
        "import { ResizeObservableService } from 'quang/device/resize-observable.service';\nprivate readonly resizeObservable = inject(ResizeObservableService);",
      exampleUsage: 'this.resizeObservable.widthResizeObservable(element).subscribe(width => console.log(width));',
      explanationKey: 'device.functions.widthResizeObservable',
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

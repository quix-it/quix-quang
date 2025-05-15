import { CommonModule, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTooltipDirective } from 'quang/overlay/tooltip'

@Component({
  selector: 'playground-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoPipe, AngularSvgIconModule, QuangTooltipDirective, NgTemplateOutlet],
})
export class FormComponent {
  buttonTooltip = signal<string>('utils.copyContent')

  formFunctions = [
    {
      functionName: 'fileMaxSize',
      import: "import { fileMaxSize } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        file: this.formBuilder.control('', [fileMaxSize(5000000)])
      });`,
      explanationKey: 'form.functions.fileMaxSize',
    },
    {
      functionName: 'fileMinSize',
      import: "import { fileMinSize } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        file: this.formBuilder.control('', [fileMinSize(1000)])
      });`,
      explanationKey: 'form.functions.fileMinSize',
    },
    {
      functionName: 'isFile',
      import: "import { isFile } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        file: this.formBuilder.control('', [isFile()])
      });`,
      explanationKey: 'form.functions.isFile',
    },
    {
      functionName: 'fileType',
      import: "import { fileType } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        file: this.formBuilder.control('', [fileType(['image/png', 'image/jpeg'])])
      });`,
      explanationKey: 'form.functions.fileType',
    },
    {
      functionName: 'fileExtensions',
      import: "import { fileExtensions } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        file: this.formBuilder.control('', [fileExtensions(['.png', '.jpg'])])
      });`,
      explanationKey: 'form.functions.fileExtensions',
    },
    {
      functionName: 'requiredCheckbox',
      import: "import { requiredCheckbox } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        agree: this.formBuilder.control(false, [requiredCheckbox()])
      });`,
      explanationKey: 'form.functions.requiredCheckbox',
    },
    {
      functionName: 'minDate',
      import: "import { minDate } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        date: this.formBuilder.control('', [minDate(new Date('2023-01-01'))])
      });`,
      explanationKey: 'form.functions.minDate',
    },
    {
      functionName: 'maxDate',
      import: "import { maxDate } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        date: this.formBuilder.control('', [maxDate(new Date('2023-12-31'))])
      });`,
      explanationKey: 'form.functions.maxDate',
    },
    {
      functionName: 'dateBetween',
      import: "import { dateBetween } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        date: this.formBuilder.control('', [dateBetween(new Date('2023-01-01'), new Date('2023-12-31'))])
      });`,
      explanationKey: 'form.functions.dateBetween',
    },
    {
      functionName: 'isFiscalCode',
      import: "import { isFiscalCode } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        fiscalCode: this.formBuilder.control('', [isFiscalCode()])
      });`,
      explanationKey: 'form.functions.isFiscalCode',
    },
    {
      functionName: 'isVatNumber',
      import: "import { isVatNumber } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        vatNumber: this.formBuilder.control('', [isVatNumber([EuroLocale.IT, EuroLocale.FR])])
      });`,
      explanationKey: 'form.functions.isVatNumber',
    },
    {
      functionName: 'wysiwygRequired',
      import: "import { wysiwygRequired } from 'quang/forms/validators';",
      exampleUsage: `this.formBuilder.group({
        content: this.formBuilder.control('<p></p>', [wysiwygRequired()])
      });`,
      explanationKey: 'form.functions.wysiwygRequired',
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

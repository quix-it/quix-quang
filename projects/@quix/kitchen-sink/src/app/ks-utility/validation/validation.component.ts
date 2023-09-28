import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { addDays } from 'date-fns'
import { QuangValidatorsService } from '../../../../../quang/utility'

@Component({
  selector: 'ks-validation',
  templateUrl: './validation.component.html',
  styles: []
})
export class ValidationComponent {
  constructor (private readonly validatorService: QuangValidatorsService) {}

  fileForm: FormGroup = new FormGroup({
    file: new FormControl('', [
      this.validatorService.isFile,
      this.validatorService.fileMinSize(100),
      this.validatorService.fileMaxSize(1000),
      this.validatorService.fileExtensions(['jpg']),
      this.validatorService.fileType(['image/jpg'])
    ])
  })

  dateForm: FormGroup = new FormGroup({
    date: new FormControl('', [
      this.validatorService.maxDate(addDays(new Date(), 5)),
      this.validatorService.minDate(new Date())
    ])
  })

  betweenForm: FormGroup = new FormGroup({
    date: new FormControl('', [
      this.validatorService.dateBetween(new Date(), addDays(new Date(), 5))
    ])
  })

  fiscalForm: FormGroup = new FormGroup({
    code: new FormControl('', [this.validatorService.isFiscalCode()])
  })

  vatForm: FormGroup = new FormGroup({
    code: new FormControl('', [this.validatorService.isVatNumber('IT')])
  })
}

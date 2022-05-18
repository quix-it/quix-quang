import { Component, ViewChild } from '@angular/core'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'

@Component({
  selector: '',
  template: '',
  styles: []
})
export class BlankComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize | null = null

}

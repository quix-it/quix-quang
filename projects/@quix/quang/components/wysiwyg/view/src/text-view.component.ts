import { Component, Input } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'quang-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss']
})
export class TextViewComponent {
  @Input() html: SafeHtml | undefined
}

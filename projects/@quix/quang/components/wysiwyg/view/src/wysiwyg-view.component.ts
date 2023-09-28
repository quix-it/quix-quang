import { Component, Input } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'quang-wysiwyg-view',
  templateUrl: './wysiwyg-view.component.html',
  styleUrls: ['./wysiwyg-view.component.scss']
})
export class QuangWysiwygViewComponent {
  @Input() html: SafeHtml | undefined
}

import { Component, Input } from '@angular/core'

@Component({
  selector: 'quang-wysiwyg-view',
  templateUrl: './wysiwyg-view.component.html',
  styleUrls: ['./wysiwyg-view.component.scss']
})
export class QuangWysiwygViewComponent {
  @Input() html: string
  @Input() label: string
}

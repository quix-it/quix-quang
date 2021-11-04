import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'quang-card-image',
  templateUrl: './quix-card-image.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuixCardImageComponent {
  @Input() src: string = ''
  @Input() alt: string = ''
}

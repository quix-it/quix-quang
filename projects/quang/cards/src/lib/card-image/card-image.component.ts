import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'quang-card-image',
  templateUrl: './card-image.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardImageComponent {
  @Input() src: string = ''
  @Input() alt: string = ''
}

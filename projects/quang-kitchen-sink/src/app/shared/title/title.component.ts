import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

@Component({
  selector: 'ks-title',
  templateUrl: './title.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  @Input() title: string = ''
}

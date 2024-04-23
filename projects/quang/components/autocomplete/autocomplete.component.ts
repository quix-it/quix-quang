import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'quang-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuangAutocompleteComponent {}

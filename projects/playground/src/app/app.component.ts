import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'

import { QuangInputComponent } from '@quix/quang/components/input'
import { QuangTranslationModule } from '@quix/quang/translation'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuangInputComponent, FormsModule, ReactiveFormsModule, QuangTranslationModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'playground'

  formBuilder = inject(NonNullableFormBuilder)

  testForm = this.formBuilder.group({
    testInput: this.formBuilder.control<string>('')
  })
}

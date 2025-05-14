import { Component, computed, inject } from '@angular/core'

import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../shared/components/component-documentation/component-documentation.component'

@Component({
  selector: 'playground-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ComponentDocumentationComponent],
})
export class HomeComponent {
  protected HomeComponent = HomeComponent
  private readonly translation = inject(QuangTranslationService)
  readmePath = computed(() =>
    this.translation.getActiveLang() === 'it' ? 'assets/docs/root-readme.it.md' : 'assets/docs/root-readme.md'
  )
}

import { Component } from '@angular/core'

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
  readmePath = '/assets/docs/root-readme.md'
}

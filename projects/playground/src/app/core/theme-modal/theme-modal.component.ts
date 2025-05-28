import { Component, Inject, Optional, output } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangModalComponent } from 'quang/overlay/modal'

import { DEPLOY_URL } from '../../app.component'

@Component({
  selector: 'playground-theme-modal',
  imports: [QuangModalComponent, TranslocoPipe, AngularSvgIconModule],
  templateUrl: './theme-modal.component.html',
  styleUrl: './theme-modal.component.scss',
})
export class ThemeModalComponent {
  closeModal = output<void>()

  style: HTMLLinkElement
  colorScheme = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  constructor(@Optional() @Inject(DEPLOY_URL) private readonly deployUrl: string) {
    this.style = document.createElement('link')
    this.style.rel = 'stylesheet'
    document.head.appendChild(this.style)
  }

  changeTheme(value: 'light' | 'dark') {
    this.style.href = `${this.deployUrl ?? ''}${value}.css`
    document.body.setAttribute('data-bs-theme', value)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(value)
  }
}

import { Component, inject, output } from '@angular/core'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangModalComponent } from 'quang/overlay/modal'

import { ThemeService } from '../../shared/services/theme.service'

@Component({
  selector: 'playground-theme-modal',
  imports: [QuangModalComponent, TranslocoPipe, AngularSvgIconModule],
  templateUrl: './theme-modal.component.html',
  styleUrl: './theme-modal.component.scss',
})
export class ThemeModalComponent {
  private readonly themeService = inject(ThemeService)

  closeModal = output<void>()
  readonly colorScheme = this.themeService.colorScheme

  changeTheme(value: 'light' | 'dark') {
    this.themeService.changeTheme(value)
  }
}

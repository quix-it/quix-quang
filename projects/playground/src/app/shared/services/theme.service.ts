import { Injectable, inject, signal } from '@angular/core'

import { DEPLOY_URL } from '../../app.component'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private style = signal<HTMLLinkElement | null>(null)
  readonly colorScheme = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  private readonly deployUrl = inject(DEPLOY_URL, { optional: true })

  constructor() {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    this.style.set(link)
    document.head.appendChild(link)
  }

  changeTheme(value: 'light' | 'dark') {
    const currentStyle = this.style()
    if (!currentStyle) {
      console.warn('Style link element is not initialized.')
      return
    }
    currentStyle.href = `${this.deployUrl ?? ''}${value}.css`
    document.body.setAttribute('data-bs-theme', value)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(value)
    localStorage.setItem('theme', value)
  }
}

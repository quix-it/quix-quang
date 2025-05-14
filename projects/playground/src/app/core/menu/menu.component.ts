import { CdkConnectedOverlay, CdkOverlayOrigin, FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay'
import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTranslationService } from 'quang/translation'

import { ThemeModalComponent } from '../theme-modal/theme-modal.component'

import { MenuItem, menuLanguage, menuList, menuTheme } from './menuList'

@Component({
  selector: 'playground-menu',
  imports: [
    AngularSvgIconModule,
    CdkConnectedOverlay,
    RouterLink,
    CdkOverlayOrigin,
    TranslocoPipe,
    ThemeModalComponent,
    NgTemplateOutlet,
  ],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly router = inject(Router)
  private readonly quangTranslationService = inject(QuangTranslationService)
  readonly menuList: MenuItem[] = menuList
  readonly menuTheme = menuTheme
  currentMenuHover = signal<MenuItem | null>(null)
  currentMenuHoverOrigin = signal<CdkOverlayOrigin | FlexibleConnectedPositionStrategyOrigin>(new ElementRef(null))
  isHoveringMenuChild = signal<boolean>(false)
  childHideTimeout = signal<number | null>(null)
  showMenuThemeModal = signal<boolean>(false)
  menuLanguage = computed(() => {
    console.log(this.quangTranslationService.activeLang()?.toUpperCase())
    return {
      ...menuLanguage,
      description: this.quangTranslationService.translate(menuLanguage.description, {
        lang: this.quangTranslationService.activeLang()?.toUpperCase(),
      }),
    }
  })

  ea = effect(() => {
    console.log(this.quangTranslationService.activeLang())
  })

  navigateMenu(route: string): void {
    this.router.navigate([route])
  }

  onMenuClick($event: MouseEvent, menu: MenuItem, origin?: CdkOverlayOrigin) {
    $event.stopPropagation()
    $event.preventDefault()
    if (!menu.children?.length && menu.route) {
      this.router.navigate([menu.route])
      return
    }
    if (this.currentMenuHover && this.currentMenuHoverOrigin) {
      this.currentMenuHover.set(null)
      this.currentMenuHoverOrigin.set(new ElementRef(null))
    } else if (origin && menu.children?.length) {
      this.onMenuMouseEnter(origin, menu)
    }
  }

  onMenuMouseEnter(origin: CdkOverlayOrigin, menu: MenuItem) {
    const childHideTimeout = this.childHideTimeout()
    if (childHideTimeout !== null) window.clearTimeout(childHideTimeout)
    this.currentMenuHover.set(null)
    this.currentMenuHoverOrigin.set(new ElementRef(null))
    setTimeout(() => {
      this.currentMenuHover.set(menu)
      this.currentMenuHoverOrigin.set(origin)
    })
  }

  onMenuMouseLeave() {
    this.childHideTimeout.set(
      window.setTimeout(() => {
        if (this.isHoveringMenuChild()) return
        this.currentMenuHover.set(null)
        this.currentMenuHoverOrigin.set(new ElementRef(null))
      }, 500)
    )
  }

  onChildMenuClick($event: MouseEvent, menu: MenuItem) {
    $event.stopPropagation()
    $event.preventDefault()
    if (menu?.route) {
      this.router.navigate([menu?.route])
    } else {
      if (menu.description?.includes('language')) {
        this.changeLanguage(menu)
      }
    }
    this.currentMenuHover.set(null)
    this.currentMenuHoverOrigin.set(new ElementRef(null))
  }

  childMenuMouseEnter() {
    this.isHoveringMenuChild.set(true)
  }

  childMenuMouseLeave() {
    this.isHoveringMenuChild.set(false)
  }

  openThemeModal(): void {
    this.showMenuThemeModal.set(true)
  }

  closeThemeModal(): void {
    this.showMenuThemeModal.set(false)
  }

  changeLanguage(menu: MenuItem): void {
    const lang = menu.description.split('.')[menu.description.split('.').length - 1]
    this.quangTranslationService.setActiveLang(lang)
  }
}

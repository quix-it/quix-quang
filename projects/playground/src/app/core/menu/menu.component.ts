import { CdkConnectedOverlay, CdkOverlayOrigin, FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay'
import { Component, ElementRef, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangPopoverDirective } from 'quang/overlay/popover'

import { MenuItem, menuList } from './menuList'

@Component({
  selector: 'playground-menu',
  imports: [AngularSvgIconModule, QuangPopoverDirective, CdkConnectedOverlay, RouterLink, CdkOverlayOrigin],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly router = inject(Router)
  readonly menuList: MenuItem[] = menuList
  // readonly MenuItem = MenuItem
  currentMenuHover = signal<MenuItem | null>(null)
  currentMenuHoverOrigin = signal<CdkOverlayOrigin | FlexibleConnectedPositionStrategyOrigin>(new ElementRef(null))
  isHoveringMenuChild = signal<boolean>(false)
  childHideTimeout = signal<number | null>(null)

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
    this.router.navigate([menu.route])
  }

  childMenuMouseEnter() {
    this.isHoveringMenuChild.set(true)
  }

  childMenuMouseLeave() {
    this.isHoveringMenuChild.set(false)
  }
}

import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangPopoverDirective } from 'quang/overlay/popover'

import { MenuItem, menuList } from './menuList'

@Component({
  selector: 'playground-menu',
  imports: [AngularSvgIconModule, QuangPopoverDirective],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly router = inject(Router)
  readonly menuList: MenuItem[] = menuList
  // readonly MenuItem = MenuItem

  navigateMenu(route: string): void {
    this.router.navigate([route])
  }
}

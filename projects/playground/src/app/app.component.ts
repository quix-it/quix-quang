import { ChangeDetectionStrategy, Component, InjectionToken } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { QuangLoaderComponent } from 'quang/loader'
import { QuangToastComponent } from 'quang/overlay/toast'

import { MenuComponent } from './core/menu/menu.component'

export const DEPLOY_URL = new InjectionToken<string>('DEPLOY_URL')

@Component({
  selector: 'playground-root',
  imports: [RouterOutlet, QuangToastComponent, QuangLoaderComponent, MenuComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

import { Component } from '@angular/core'

import VConsole from 'vconsole'

@Component({
  selector: 'ks-vconsole',
  templateUrl: './vconsole.component.html',
  styles: []
})
export class VconsoleComponent {
  console: VConsole | null = null

  openConsole(): void {
    this.console = new VConsole({ theme: 'dark' })
  }

  closeConsole(): void {
    this.console?.destroy()
  }
}

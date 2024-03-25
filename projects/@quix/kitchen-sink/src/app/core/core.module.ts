import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTreeModule } from '@angular/material/tree'
import { RouterModule } from '@angular/router'

import { AsideComponent } from './aside/aside.component'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [HeaderComponent, AsideComponent, FooterComponent],
  exports: [HeaderComponent, AsideComponent, FooterComponent],
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, RouterModule]
})
export class CoreModule {}

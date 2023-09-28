import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { AsideComponent } from './aside/aside.component'
import { FooterComponent } from './footer/footer.component'

import { RouterModule } from '@angular/router'
import { MatTreeModule } from '@angular/material/tree'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [HeaderComponent, AsideComponent, FooterComponent],
  exports: [HeaderComponent, AsideComponent, FooterComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class CoreModule {}

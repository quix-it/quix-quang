import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'
import { ValidationComponent } from './validation/validation.component'
import { StorageComponent } from './storage/storage.component'
import { DeviceComponent } from './device/device.component'
import { PageComponent } from './page/page.component'
import { DeviceMotionComponent } from './device-motion/device-motion.component'

const routes: Routes = [
  { path: 'layout', component: LayoutComponent },
  { path: 'validators', component: ValidationComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'motion', component: DeviceMotionComponent },
  { path: 'page', component: PageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsUtilityRoutingModule {}

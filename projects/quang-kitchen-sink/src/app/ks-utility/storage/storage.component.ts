import { Component, type OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { QuangStorageService } from '../../../../../quang/utility/src/public_api'

@Component({
  selector: 'ks-storage',
  templateUrl: './storage.component.html',
  styles: []
})
export class StorageComponent implements OnInit {
  session: string = ''
  local: string = ''
  sessionForm: FormGroup = new FormGroup({
    session: new FormControl('')
  })

  localForm: FormGroup = new FormGroup({
    local: new FormControl('')
  })

  constructor (private readonly storageService: QuangStorageService) {}

  ngOnInit (): void {
    this.getSession()
    this.getLocal()
    this.observeLocal()
    this.observeSession()
  }

  saveSession (): void {
    this.storageService.setSession(
      'session',
      this.sessionForm.controls.session.value
    )
  }

  getSession (): void {
    this.session = this.storageService.getSession('session')
  }

  deleteSession (): void {
    this.storageService.clearSession('session')
  }

  observeSession (): void {
    this.storageService.observeSession('session').subscribe((v: any) => {
      this.session = v
    })
  }

  saveLocal (): void {
    this.storageService.setLocal(
      'local',
      this.localForm.controls.local.value
    )
  }

  getLocal (): void {
    this.local = this.storageService.getLocal('local')
  }

  deleteLocal (): void {
    this.storageService.clearLocal('local')
  }

  observeLocal (): void {
    this.storageService.observeLocal('local').subscribe((v: any) => {
      this.local = v
    })
  }
}

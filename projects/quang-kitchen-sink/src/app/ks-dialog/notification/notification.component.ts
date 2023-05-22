import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { type AppState } from '../../app-store/app.reducers'
import { QuangNotificationService } from '../../../../../quang/dialog/src/lib/notification/notification.service'
import { QuangNotification } from '../../../../../quang/dialog/src/lib/notification/notification.model'

@Component({
  selector: 'ks-notification',
  templateUrl: './notification.component.html',
  styles: []
})
export class NotificationComponent {
  noteForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  })

  constructor (
    private readonly store: Store<AppState>,
    private readonly notificationService: QuangNotificationService
  ) {}

  sendNotification (): void {
    this.notificationService.requestPermission().subscribe((p) => {
      if (p) {
        this.notificationService.sendNotification(
          new QuangNotification(
            this.noteForm.controls.title.value,
            this.noteForm.controls.body.value,
            'https://picsum.photos/800/1200'
          )
        )
      }
    })
  }
}

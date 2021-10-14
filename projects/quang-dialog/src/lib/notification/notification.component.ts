import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from '../../app-store/app.reducers'
import { sendNotification } from '../../quang-dialog-core/notification/notification-store/notification.action'
import { QuixNotification } from '../../quang-dialog-core/notification/notification.model'
import { QuixNotificationService } from '../../quang-dialog-core/notification/notification.service'

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
    private store: Store<AppState>,
    private readonly notificationService: QuixNotificationService
  ) { }

  sendNotification (): void {
    this.notificationService.requestPermission().subscribe((p) => {
      if (p) {
        this.notificationService.sendNotification(new QuixNotification(
          this.noteForm.controls.title.value,
          this.noteForm.controls.body.value,
          'https://picsum.photos/800/1200'
        ))
      }
    })
  }
}

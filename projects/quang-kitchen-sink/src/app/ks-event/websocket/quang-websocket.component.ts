import { Component } from '@angular/core'
import { QuangWebsocketService } from '../../../../../quang-event/src/lib/quang-websocket/quang-websocket.service'

@Component({
  selector: 'quang-websocket',
  templateUrl: './quang-websocket.component.html',
  styleUrls: [],
  providers: [QuangWebsocketService]
})

export class QuangWebsocketComponent {
  msgs: string[] = []
  stop: boolean = false

  constructor (private webSocket: QuangWebsocketService) {}

  getMessages () {
    this.webSocket.messages.forEach((m) => {
      if (!this.msgs.includes(m)) {
        this.msgs.push(m)
      }
    })
  }
}

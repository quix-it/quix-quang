import { Component } from '@angular/core'

import { QuangWebsocketService } from '@quix/quang/event'

@Component({
  selector: 'quang-websocket',
  templateUrl: './quang-websocket.component.html',
  styleUrls: [],
  providers: [QuangWebsocketService]
})
export class QuangWebsocketComponent {
  msgs: string[] = []
  stop: boolean = false

  constructor(private readonly webSocket: QuangWebsocketService) {}

  getMessages(): void {
    this.webSocket.messages.forEach((m) => {
      if (!this.msgs.includes(m)) {
        this.msgs.push(m)
      }
    })
  }
}

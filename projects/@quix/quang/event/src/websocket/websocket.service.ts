import { Injectable } from '@angular/core'

@Injectable()
export class QuangWebsocketService {
  private readonly socket = new WebSocket('wss://javascript.info/article/websocket/demo/hello')
  public messages: string[] = []

  constructor() {
    this.socket.onopen = () => {
      this.socket.send('sended message')
      this.messages.push('[open] connection')
      this.messages.push('sending to server')
      this.messages.push('sended message')
    }

    this.socket.onmessage = (ev) => {
      this.messages.push(`[message] data receveived from server: ${ev.data}`)
    }

    this.socket.onclose = (ev) => {
      if (ev.wasClean) {
        this.messages.push(`connection closed, code=${ev.code} reason=${ev.reason}`)
      } else {
        this.messages.push('[close] connection died')
      }
    }

    this.socket.onerror = (error) => {
      this.messages.push(`[error] ${error.type}`)
    }
  }
}

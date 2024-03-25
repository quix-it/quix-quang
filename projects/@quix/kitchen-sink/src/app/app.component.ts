import { Component } from '@angular/core'

@Component({
  selector: 'ks-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {
  title = 'blank'

  test(): void {}

  getTitle(): string {
    return this.title
  }
}

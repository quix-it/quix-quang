import { Component, ViewChild } from '@angular/core'
import { QuangVideoComponent } from '@quix/quang/components'

@Component({
  selector: 'ks-video',
  templateUrl: './video.component.html',
  styles: []
})
export class VideoComponent {
  config: string[] = []
  @ViewChild('quangVideo', { static: true }) video: QuangVideoComponent | null = null

  full(): void {
    this.video?.toFullScreen()
  }
}

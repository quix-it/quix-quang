import { Component, ViewChild } from '@angular/core'
import { VideoComponent as QuangVideo } from '../../../../../quang/media/src/lib/video/video.component'

@Component({
  selector: 'ks-video',
  templateUrl: './video.component.html',
  styles: []
})
export class VideoComponent {
  config: string[] = []
  @ViewChild('quangVideo', { static: true }) video: QuangVideo | null = null

  full(): void {
    this.video?.toFullScreen()
  }
}

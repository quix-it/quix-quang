import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'quix-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnChanges {
  @Input() id: string;
  @Input() src: SafeUrl;
  @Input() baseImage: SafeUrl;
  @Input() autoplay: boolean;
  @Input() viewControl: boolean;
  @Input() loop: boolean;
  @Input() mute: boolean;
  @Input() type: 'video/mp4' | 'video/webm' | 'video/OGG';
  @ViewChild('video', {static: true}) video: HTMLVideoElement;
  _currentTime: number = 0
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.src = this.sanitizer.bypassSecurityTrustUrl(changes.src?.currentValue)
    this.baseImage = this.sanitizer.bypassSecurityTrustUrl(changes.baseImage?.currentValue)
    this.video.pause()
    this._currentTime = 0
    this.video.load()
  }

}

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'quix-video',
  templateUrl: './video.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() src: SafeUrl;
  @Input() baseImage: SafeUrl;
  @Input() autoplay: boolean;
  @Input() viewControl: boolean;
  @Input() loop: boolean;
  @Input() mute: boolean;
  @Input() type: 'video/mp4' | 'video/webm' | 'video/OGG';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.src = this.sanitizer.bypassSecurityTrustUrl(changes.src.currentValue)
    this.baseImage = this.sanitizer.bypassSecurityTrustUrl(changes.baseImage?.currentValue)
  }

}

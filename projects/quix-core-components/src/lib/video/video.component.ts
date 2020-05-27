import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'quix-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() id: string;
  @Input() src: string;
  @Input() baseImage: string;
  @Input() autoplay: boolean;
  @Input() viewControl: boolean;
  @Input() loop: boolean;
  @Input() type: 'video/mp4' | 'video/webm' | 'video/OGG';



  @Input() viewPlay: boolean;
  @Input() viewTime: boolean;
  @Input() viewMute: boolean;
  @Input() viewVolume: boolean;
  @Input() viewBar: boolean;
  @Input() viewFull: boolean;
  @Input() viewSpeed: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}

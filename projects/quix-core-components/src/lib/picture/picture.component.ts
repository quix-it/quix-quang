import {Component, Input, OnInit} from '@angular/core';
import {PictureModel} from './picture.model';

@Component({
  selector: 'quix-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() id: string;
  @Input() alt: string;
  @Input() src: string;
  @Input() responsiveList: Array<PictureModel>;


  constructor() {
  }

  ngOnInit() {
  }

}

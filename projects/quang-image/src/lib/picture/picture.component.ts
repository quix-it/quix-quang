import {Component, Input, OnInit} from '@angular/core';
import {QuixPicture} from './picture.model';

@Component({
  selector: 'quix-picture',
  templateUrl: './picture.component.html',
  styles: ['']
})
export class PictureComponent implements OnInit {
  @Input() id: string;
  @Input() alt: string;
  @Input() src: string;
  @Input() responsiveList: Array<QuixPicture>;


  constructor() {
  }

  ngOnInit() {
  }

}

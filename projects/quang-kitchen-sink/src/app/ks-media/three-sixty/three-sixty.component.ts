import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ks-three-sixty',
  templateUrl: './three-sixty.component.html',
  styles: []
})
export class ThreeSixtyComponent {
  config: string[] = []
  list: string[] = [
    'assets/images/360/KOCCA_360_1.jpg',
    'assets/images/360/KOCCA_360_2.jpg',
    'assets/images/360/KOCCA_360_3.jpg',
    'assets/images/360/KOCCA_360_4.jpg',
    'assets/images/360/KOCCA_360_5.jpg',
    'assets/images/360/KOCCA_360_6.jpg',
    'assets/images/360/KOCCA_360_7.jpg',
    'assets/images/360/KOCCA_360_8.jpg'
  ]
}

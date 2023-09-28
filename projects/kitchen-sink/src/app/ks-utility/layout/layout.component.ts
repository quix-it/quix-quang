import { Component, OnInit } from '@angular/core'
import { QuangLayoutService } from '../../../../../@quix/quang/utility/src/public_api'

@Component({
  selector: 'ks-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  orientation: any

  constructor(private readonly layoutService: QuangLayoutService) {}

  ngOnInit(): void {
    this.layoutService.getOrientation().subscribe((v) => (this.orientation = v))
  }
}

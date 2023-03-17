import { Component } from '@angular/core'
import { QuangPicture } from '../../../../../quang-media/src/lib/picture/picture.model'

@Component({
  selector: 'ks-picture',
  templateUrl: './picture.component.html',
  styles: []
})
export class PictureComponent {
  pic = new QuangPicture(
    'https://picsum.photos/100/150',
    'https://picsum.photos/200/250',
    'https://picsum.photos/300/350',
    'https://picsum.photos/400/450',
    'https://picsum.photos/500/550',
    'https://picsum.photos/700/750',
    'https://picsum.photos/900/950'
  )
}

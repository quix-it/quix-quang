import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'quix-three-sixty-image',
  templateUrl: './quix-three-sixty-image.component.html',
  styleUrls: ['./quix-three-sixty-image.component.scss']
})
export class QuixThreeSixtyImageComponent implements OnInit, AfterViewInit {
  @Input() id: string
  @Input() height: string
  @Input() customClass: string[]
  @Input() imageList: string[] = []
  // @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>
  step: number = 30
  context: any;
  currentX: any
  currentFrame: number = 0
  intervalId: any
  mouseStateDown = false
  imageUrl: string;


  constructor(
    private render: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.imageUrl = 'url("' + this.imageList[0] + '")'
  }

  ngAfterViewInit() {
    // this.context = this.canvas.nativeElement.getContext('2d')
    // let image = this.render.createElement('img')
    // image.onload = this.drawImage(image)
    // image.src = this.imageList[0]
    this.autoRotator()
  }

  drawImage(imgContext) {
    // setTimeout(() => {
    //     this.context.drawImage(imgContext, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    //   },
    //   300
    // )
  }

  mouseMove(event) {
    if (this.mouseStateDown) {
      let screenX = (event.screenX) ? event.screenX : event.touches[0].screenX;
      if (this.currentX - screenX >= this.step) {
        this.rotator('-');
        this.currentX = screenX;
      } else if (this.currentX - screenX <= -this.step) {
        this.rotator('+');
        this.currentX = screenX;
      }
    }
  }

  mouseDown(event) {
    event.preventDefault()
    this.currentX = event.screenX
    clearInterval(this.intervalId)
    this.intervalId = null;
    this.mouseStateDown = true
  }

  mouseUp(event) {
    event.preventDefault()
    this.currentX = event.screenX
    this.autoRotator()
    this.mouseStateDown = false
  }

  rotator(act) {
    if (act === '-') {
      this.currentFrame++;
      this.currentFrame = (this.currentFrame > this.imageList.length - 1) ? 0 : this.currentFrame;
    } else {
      this.currentFrame--;
      this.currentFrame = (this.currentFrame <= 0) ? this.imageList.length - 1 : this.currentFrame;
    }
    // let image = this.render.createElement('img')
    // image.onload = this.drawImage(image)
    // image.src = this.imageList[this.currentFrame]
    this.imageUrl = 'url("' + this.imageList[this.currentFrame] + '")'
  }

  autoRotator() {
    this.intervalId = setInterval(
      () => {
        this.rotator('+')
      }, 150);
  }

}

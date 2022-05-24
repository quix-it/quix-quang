import { BlankComponent } from './blank.component'
import { withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata } from '@storybook/angular'
import { TranslocoModule } from '@ngneat/transloco'
import { CommonModule } from '@angular/common'
import { Meta, Story } from '@storybook/angular/types-6-0'
import { AudioComponent } from '../projects/quang-media/src/lib/audio/audio.component'
import { CodeReaderComponent, ThreeSixtyImageComponent, VideoComponent } from 'projects/quang-media/src/public-api'
import { Html5QrcodeResult } from 'html5-qrcode/core'
import { Html5QrcodeSupportedFormats } from 'html5-qrcode'
// @ts-ignore
import audio from './assets/audios/audio.mp3'
// @ts-ignore
import img1 from './assets/images/360/KOCCA_360_1.jpg'
// @ts-ignore
import img2 from './assets/images/360/KOCCA_360_2.jpg'
// @ts-ignore
import img3 from './assets/images/360/KOCCA_360_3.jpg'
// @ts-ignore
import img4 from './assets/images/360/KOCCA_360_4.jpg'
// @ts-ignore
import img5 from './assets/images/360/KOCCA_360_5.jpg'
// @ts-ignore
import img6 from './assets/images/360/KOCCA_360_6.jpg'
// @ts-ignore
import img7 from './assets/images/360/KOCCA_360_7.jpg'
// @ts-ignore
import img8 from './assets/images/360/KOCCA_360_8.jpg'

export default {
  title: 'Media',
  component: BlankComponent,
  subcomponents: {
    AudioComponent,
    VideoComponent,
    CodeReaderComponent,
    ThreeSixtyImageComponent
  },
  decorators: [withKnobs, moduleMetadata({
    declarations: [
      BlankComponent,
      AudioComponent,
      VideoComponent,
      CodeReaderComponent,
      ThreeSixtyImageComponent
    ],
    imports: [
      TranslocoModule,
      CommonModule,
    ],
  })]
} as Meta

const MediaAudio: Story<BlankComponent> = (args: BlankComponent) => {
  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang media audio</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/AudioComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-audio
                          [id]="'test'"
                          [src]="src"
                          [type]="'audio/mpeg'"
                        ></quang-audio>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      src: audio
    }
  }
}
const BarCode: Story<BlankComponent> = (args: BlankComponent) => {

  let result = ''
  const barCodeFormat = [
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8
  ]

  return {
    component: BlankComponent,

    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang QR code reader</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/CodeReaderComponents.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-code-reader
                          [id]="'reader'"
                          [formats]="barCodeFormat"
                          [errorMessage]="'No webcam available'"
                          (whenFindCode)="logCode($event)"
                        ></quang-code-reader>
                        {{result | json}}
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      result: result,
      barCodeFormat: barCodeFormat,
      logCode (code: Html5QrcodeResult): void {
        this.result = code
      }
    }
  }
}
const QrCode: Story<BlankComponent> = (args: BlankComponent) => {

  let result = ''
  const qrCodeFormat = [
    Html5QrcodeSupportedFormats.QR_CODE
  ]

  return {
    component: BlankComponent,

    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang QR code reader</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/CodeReaderComponents.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <quang-code-reader
                          [id]="'reader'"
                          [formats]="qrCodeFormat"
                          [errorMessage]="'No webcam available'"
                          (whenFindCode)="logCode($event)"
                        ></quang-code-reader>
                        {{result | json}}
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      result: result,
      qrCodeFormat: qrCodeFormat,
      logCode (code: Html5QrcodeResult): void {
        this.result = code
      }
    }
  }
}
const MediaVideo: Story<BlankComponent> = (args: BlankComponent) => {
  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang media audio</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/AudioComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <div class="w-50 h-50">
                            <quang-video
                            [id]="'test'"
                            [src]="'https://storage.coverr.co/videos/fbR00NW26LPtWnO01m9w8w2z9CUiFYe8li?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM1MTc5MjAzfQ.XCeXZ15YrvGSA8NZOXqbg7JRSvJAEaPWGubIrU-JGMM'"
                            [type]="'video/mp4'"
                            [autoplay]="false"
                            [loop]="true"
                            [viewControl]="true"
                            ></quang-video>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args
    }
  }
}
const Tsixty: Story<BlankComponent> = (args: BlankComponent) => {

  const list = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8
  ]
  return {
    component: BlankComponent,
    template:
      `
            <section class="container-fluid">
              <div class="row mb-3">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3>Quang media audio</h3>
                        </div>
                        <div class="col-6 text-end">
                            <a cardAction href="https://rd.quix.it/quang/components/QuixThreeSixtyImageComponent.html">Configurazioni</a>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <div class="w-50 h-50">
                            <quang-three-sixty-image
                              [id]="'test'"
                              [height]="'50vh'"
                              [images]="list"
                              [timeRotation]="150">
                              <i nextIcon class="fas fa-forward"></i>
                              <i previousIcon class="fas fa-backward"></i>
                              <i stopIcon class="fas fa-stop"></i>
                              <i playIcon class="fas fa-play"></i>
                            </quang-three-sixty-image>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    `,
    props: {
      ...args,
      list: list
    }
  }
}

export const Audio = MediaAudio.bind({})
export const BarCodeReader = BarCode.bind({})
export const QRCodeReader = QrCode.bind({})
export const TreeSixty = Tsixty.bind({})
export const Video = MediaVideo.bind({})

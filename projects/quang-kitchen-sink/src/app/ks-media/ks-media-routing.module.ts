import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PictureComponent } from './picture/picture.component'
import { VideoComponent } from './video/video.component'
import { ThreeSixtyComponent } from './three-sixty/three-sixty.component'
import { CodeReaderComponent } from './code-reader/code-reader.component'
import { AudioComponent } from './audio/audio.component'
import { WebcamComponent } from './webcam/webcam.component'

const routes: Routes = [
  { path: 'picture', component: PictureComponent },
  { path: 'video', component: VideoComponent },
  { path: 'threesixty', component: ThreeSixtyComponent },
  { path: 'codereader', component: CodeReaderComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'webcam', component: WebcamComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KsMediaRoutingModule {}

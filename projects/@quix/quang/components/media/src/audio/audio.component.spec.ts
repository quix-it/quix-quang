import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangAudioComponent } from './audio.component'

describe('AudioComponent', () => {
  let component: QuangAudioComponent
  let fixture: ComponentFixture<QuangAudioComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangAudioComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangAudioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

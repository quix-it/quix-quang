import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangWebcamComponent } from './webcam.component'

describe('WebcamComponent', () => {
  let component: QuangWebcamComponent
  let fixture: ComponentFixture<QuangWebcamComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangWebcamComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangWebcamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

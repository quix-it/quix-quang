import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangVideoComponent } from './video.component'

describe('VideoComponent', () => {
  let component: QuangVideoComponent
  let fixture: ComponentFixture<QuangVideoComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangVideoComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangVideoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

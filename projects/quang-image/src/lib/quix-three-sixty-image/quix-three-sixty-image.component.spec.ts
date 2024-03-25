import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuixThreeSixtyImageComponent } from './quix-three-sixty-image.component'

describe('QuixThreeSixtyImageComponent', () => {
  let component: QuixThreeSixtyImageComponent
  let fixture: ComponentFixture<QuixThreeSixtyImageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixThreeSixtyImageComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixThreeSixtyImageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

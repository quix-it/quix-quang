import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangThreeSixtyImageComponent } from './three-sixty-image.component'

describe('ThreeSixtyImageComponent', () => {
  let component: QuangThreeSixtyImageComponent
  let fixture: ComponentFixture<QuangThreeSixtyImageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangThreeSixtyImageComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangThreeSixtyImageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

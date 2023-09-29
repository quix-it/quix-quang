import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangSliderComponent } from './slider.component'

describe('SliderComponent', () => {
  let component: QuangSliderComponent
  let fixture: ComponentFixture<QuangSliderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangSliderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangSliderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

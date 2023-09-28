import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputRadioComponent } from './input-radio.component'

describe('InputRadioComponent', () => {
  let component: QuangInputRadioComponent
  let fixture: ComponentFixture<QuangInputRadioComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputRadioComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputRadioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

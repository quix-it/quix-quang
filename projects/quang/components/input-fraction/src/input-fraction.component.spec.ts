import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { InputFractionComponent } from './input-fraction.component'

describe('InputFractionComponent', () => {
  let component: InputFractionComponent
  let fixture: ComponentFixture<InputFractionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputFractionComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFractionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputDateComponent } from './input-date.component'

describe('DatePickerComponent', () => {
  let component: QuangInputDateComponent
  let fixture: ComponentFixture<QuangInputDateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputDateComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputDateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputDateRangeComponent } from './input-date-range.component'

describe('InputDateRangeComponent', () => {
  let component: QuangInputDateRangeComponent
  let fixture: ComponentFixture<QuangInputDateRangeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputDateRangeComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputDateRangeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

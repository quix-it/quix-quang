import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCalendarComponent } from './calendar.component'

describe('CalendarComponent', () => {
  let component: QuangCalendarComponent
  let fixture: ComponentFixture<QuangCalendarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCalendarComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCalendarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

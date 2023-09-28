import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DateFnsComponent } from './date-fns.component'

describe('DateFnsComponent', () => {
  let component: DateFnsComponent
  let fixture: ComponentFixture<DateFnsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFnsComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFnsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

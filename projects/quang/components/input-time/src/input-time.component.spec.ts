import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputTimeComponent } from './input-time.component'

describe('InputTimeComponent', () => {
  let component: InputTimeComponent
  let fixture: ComponentFixture<InputTimeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTimeComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

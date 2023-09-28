import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputTelComponent } from './input-tel.component'

describe('InputTelComponent', () => {
  let component: QuangInputTelComponent
  let fixture: ComponentFixture<QuangInputTelComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputTelComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputTelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

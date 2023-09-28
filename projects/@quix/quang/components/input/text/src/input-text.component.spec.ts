import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputTextComponent } from './input-text.component'

describe('InputTextComponent', () => {
  let component: QuangInputTextComponent
  let fixture: ComponentFixture<QuangInputTextComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputTextComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

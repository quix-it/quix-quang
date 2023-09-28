import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangSimpleCardComponent } from './simple-card.component'

describe('CardSimpleComponent', () => {
  let component: QuangSimpleCardComponent
  let fixture: ComponentFixture<QuangSimpleCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangSimpleCardComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangSimpleCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

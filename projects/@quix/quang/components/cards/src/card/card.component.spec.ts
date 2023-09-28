import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCardComponent } from './card.component'

describe('CardComponent', () => {
  let component: QuangCardComponent
  let fixture: ComponentFixture<QuangCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCardComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

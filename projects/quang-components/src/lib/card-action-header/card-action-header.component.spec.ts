import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CardActionHeaderComponent } from './card-action-header.component'

describe('CardActionHeaderComponent', () => {
  let component: CardActionHeaderComponent
  let fixture: ComponentFixture<CardActionHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardActionHeaderComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

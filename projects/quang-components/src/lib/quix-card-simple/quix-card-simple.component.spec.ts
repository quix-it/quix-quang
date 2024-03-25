import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuixCardSimpleComponent } from './quix-card-simple.component'

describe('QuixCardSimpleComponent', () => {
  let component: QuixCardSimpleComponent
  let fixture: ComponentFixture<QuixCardSimpleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixCardSimpleComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardSimpleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

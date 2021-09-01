import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuixCardActionComponent } from './quix-card-action.component'

describe('QuixCardActionComponent', () => {
  let component: QuixCardActionComponent
  let fixture: ComponentFixture<QuixCardActionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixCardActionComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardActionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

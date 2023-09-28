import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCardActionComponent } from './card-action.component'

describe('CardActionComponent', () => {
  let component: QuangCardActionComponent
  let fixture: ComponentFixture<QuangCardActionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCardActionComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardActionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

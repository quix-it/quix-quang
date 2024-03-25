import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangHttpErrorModalComponent } from './http-error-modal.component'

describe('QuangHttpErrorModalComponent', () => {
  let component: QuangHttpErrorModalComponent
  let fixture: ComponentFixture<QuangHttpErrorModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangHttpErrorModalComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangHttpErrorModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

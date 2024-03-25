import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuixCardActionHeaderComponent } from './quix-card-action-header.component'

describe('QuixCardActionHeaderComponent', () => {
  let component: QuixCardActionHeaderComponent
  let fixture: ComponentFixture<QuixCardActionHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuixCardActionHeaderComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardActionHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangCardActionHeaderComponent } from './card-action-header.component'

describe('CardActionHeaderComponent', () => {
  let component: QuangCardActionHeaderComponent
  let fixture: ComponentFixture<QuangCardActionHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCardActionHeaderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardActionHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

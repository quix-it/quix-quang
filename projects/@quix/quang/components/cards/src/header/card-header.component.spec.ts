import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangCardHeaderComponent } from './card-header.component'

describe('CardHeaderComponent', () => {
  let component: QuangCardHeaderComponent
  let fixture: ComponentFixture<QuangCardHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangCardHeaderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

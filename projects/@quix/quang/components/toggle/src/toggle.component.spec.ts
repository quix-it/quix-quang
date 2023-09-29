import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangToggleComponent } from './toggle.component'

describe('ToggleComponent', () => {
  let component: QuangToggleComponent
  let fixture: ComponentFixture<QuangToggleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangToggleComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangToggleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangInputTimeComponent } from './input-time.component'

describe('InputTimeComponent', () => {
  let component: QuangInputTimeComponent
  let fixture: ComponentFixture<QuangInputTimeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangInputTimeComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputTimeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

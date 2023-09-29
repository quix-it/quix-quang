import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputPasswordComponent } from './input-password.component'

describe('InputPasswordComponent', () => {
  let component: QuangInputPasswordComponent
  let fixture: ComponentFixture<QuangInputPasswordComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputPasswordComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

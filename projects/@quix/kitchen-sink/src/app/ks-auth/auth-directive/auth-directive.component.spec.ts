import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthDirectiveComponent } from './auth-directive.component'

describe('AuthDirectiveComponent', () => {
  let component: AuthDirectiveComponent
  let fixture: ComponentFixture<AuthDirectiveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthDirectiveComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDirectiveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

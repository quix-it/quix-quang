import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthConfigComponent } from './auth-config.component'

describe('AuthConfigComponent', () => {
  let component: AuthConfigComponent
  let fixture: ComponentFixture<AuthConfigComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthConfigComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthConfigComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

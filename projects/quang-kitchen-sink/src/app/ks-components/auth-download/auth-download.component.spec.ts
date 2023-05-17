import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthDownloadComponent } from './auth-download.component'

describe('AuthDownloadComponent', () => {
  let component: AuthDownloadComponent
  let fixture: ComponentFixture<AuthDownloadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthDownloadComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDownloadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

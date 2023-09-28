import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SyncValidatorComponent } from './sync-validator.component'

describe('SyncValidatorComponent', () => {
  let component: SyncValidatorComponent
  let fixture: ComponentFixture<SyncValidatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncValidatorComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncValidatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

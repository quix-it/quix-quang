import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TelComponent } from './tel.component'

describe('TelComponent', () => {
  let component: TelComponent
  let fixture: ComponentFixture<TelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

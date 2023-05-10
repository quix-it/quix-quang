import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FractionComponent } from './fraction.component'

describe('FractionComponent', () => {
  let component: FractionComponent
  let fixture: ComponentFixture<FractionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FractionComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

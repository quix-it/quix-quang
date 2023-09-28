import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TrainingArrayComponent } from './training-array.component'

describe('TrainingArrayComponent', () => {
  let component: TrainingArrayComponent
  let fixture: ComponentFixture<TrainingArrayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingArrayComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingArrayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

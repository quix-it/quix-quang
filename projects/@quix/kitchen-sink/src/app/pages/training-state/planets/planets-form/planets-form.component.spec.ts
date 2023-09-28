import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PlanetsFormComponent } from './planets-form.component'

describe('PlanetsFormComponent', () => {
  let component: PlanetsFormComponent
  let fixture: ComponentFixture<PlanetsFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetsFormComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

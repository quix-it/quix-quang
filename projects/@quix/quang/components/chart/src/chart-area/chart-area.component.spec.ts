import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ChartAreaComponent } from './chart-area.component'

describe('ChartAreaComponent', () => {
  let component: ChartAreaComponent
  let fixture: ComponentFixture<ChartAreaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartAreaComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

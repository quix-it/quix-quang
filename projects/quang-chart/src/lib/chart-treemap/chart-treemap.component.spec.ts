import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartTreemapComponent } from './chart-treemap.component'

describe('ChartTreemapComponent', () => {
  let component: ChartTreemapComponent
  let fixture: ComponentFixture<ChartTreemapComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartTreemapComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTreemapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

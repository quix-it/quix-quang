import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartTreeComponent } from './chart-tree.component'

describe('ChartTreeComponent', () => {
  let component: ChartTreeComponent
  let fixture: ComponentFixture<ChartTreeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartTreeComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTreeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSearchFilterComponent } from './workout-search-filter.component';

describe('WorkoutSearchFilterComponent', () => {
  let component: WorkoutSearchFilterComponent;
  let fixture: ComponentFixture<WorkoutSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutSearchFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    const initialLength = service.getWorkouts().length;
    service.addWorkout('Test User', 'Running', 30);
    const newLength = service.getWorkouts().length;

    expect(newLength).toBe(initialLength + 1);
    expect(service.getWorkouts()[newLength - 1]).toEqual({
      name: 'Test User',
      workoutType: 'Running',
      minutes: 30,
    });
  });

  it('should load workouts from local storage', () => {
    const workoutData = [
      { name: 'User1', workoutType: 'Running', minutes: 30 },
      { name: 'User2', workoutType: 'Cycling', minutes: 40 },
    ];
    localStorage.setItem('workouts', JSON.stringify(workoutData));
    const loadedWorkouts = service.getWorkouts();

    expect(loadedWorkouts).toEqual(workoutData);
  });

  it('should save workouts to local storage', () => {
    service.addWorkout('Test User', 'Running', 30);
    const savedData = JSON.parse(localStorage.getItem('workouts')!);

    expect(savedData).toContain({
      name: 'Test User',
      workoutType: 'Running',
      minutes: 30,
    });
  });
});

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.workouts = this.loadWorkouts();
    }
  }

  addWorkout(name: string, workoutType: string, minutes: number) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Adding workout:', { name, workoutType, minutes });
      this.workouts.push({ name, workoutType, minutes });
      this.saveWorkouts();
    }
  }

  getWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      const workouts = this.loadWorkouts();
      console.log('Retrieving workouts:', workouts);
      return workouts;
    }
    return [];
  }

  private saveWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }
  }

  private loadWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('workouts');
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
}

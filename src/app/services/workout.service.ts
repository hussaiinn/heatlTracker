import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: any[] = [];

  //Injecting Platform id to check if code is running in browser or not 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.workouts = this.loadWorkouts();
    }
    this.initializeData();
  }

  

  //Method to add workouts
  addWorkout(name: string, workoutType: string, minutes: number) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Adding workout:', { name, workoutType, minutes });
      this.workouts.push({ name, workoutType, minutes });
      this.saveWorkouts();
    }
  }

  //Method to fetch workouts
  getWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      const workouts = this.loadWorkouts();
      console.log('Retrieving workouts:', workouts);
      return workouts;
    }
    return [];
  }

  //if no data is their in local storage
  private initializeData() {
    const defaultWorkouts = [
      { name: 'John Doe', workoutType: 'Running', minutes: 30 },
      { name: 'Jane Smith', workoutType: 'Cycling', minutes: 45 },
      { name: 'Mike Johnson', workoutType: 'Swimming', minutes: 60 }
    ];

    this.workouts = this.loadWorkouts();

    if (this.workouts.length === 0) {
      this.workouts = defaultWorkouts;
      this.saveWorkouts();
    }
  }

  //Method to save workouts
  private saveWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('workouts', JSON.stringify(this.workouts));
    }
  }

  //Method to load workouts
  private loadWorkouts() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('workouts');
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
}

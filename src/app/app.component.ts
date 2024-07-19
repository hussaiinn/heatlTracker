// src/app/app.component.ts
import { Component } from '@angular/core';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutSearchFilterComponent } from './components/workout-search-filter/workout-search-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WorkoutListComponent, AddWorkoutComponent, WorkoutSearchFilterComponent]
})
export class AppComponent {
  title = 'Health Tracker';
}

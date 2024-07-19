import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms'; 
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
  imports: [FormsModule]
})
export class AddWorkoutComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.name && this.workoutType && this.minutes) {
      this.workoutService.addWorkout(this.name, this.workoutType, this.minutes);
      this.name = '';
      this.workoutType = '';
      this.minutes = null;
    }
  }
}

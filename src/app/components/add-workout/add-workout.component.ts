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
  //Define Properties
  name: string = '';
  workoutType: string = '';
  minutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  //to add new workout
  addWorkout() {
    if (this.name && this.workoutType && this.minutes) {
      this.workoutService.addWorkout(this.name, this.workoutType, this.minutes);
      this.name = '';
      this.workoutType = '';
      this.minutes = null;
      alert("Your workout has been added.\nThe new entry will appear at the end of the list");
    } else{
      alert('Please fill out all fields');
    }
  }
}

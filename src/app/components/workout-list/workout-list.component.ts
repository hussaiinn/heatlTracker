import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { WorkoutSearchFilterComponent } from '../workout-search-filter/workout-search-filter.component';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  imports: [CommonModule, WorkoutSearchFilterComponent],
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.applyFilter({ searchTerm: '', filterWorkoutType: '' });
  }

  applyFilter(filter: { searchTerm: string; filterWorkoutType: string }) {
    this.filteredWorkouts = this.workouts
      .filter(
        (workout) =>
          workout.name
            .toLowerCase()
            .includes(filter.searchTerm.toLowerCase()) &&
          (filter.filterWorkoutType === '' ||
            workout.workoutType.toLowerCase() === filter.filterWorkoutType.toLowerCase())
      )
      .slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilter({ searchTerm: '', filterWorkoutType: '' });
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.workouts.length) {
      this.currentPage++;
      this.applyFilter({ searchTerm: '', filterWorkoutType: '' });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { WorkoutSearchFilterComponent } from '../workout-search-filter/workout-search-filter.component';
// import Chart from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';


// Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip);

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
  selectedUser: any;
  chart: any;
  users: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  //Initialize and fetch workouts
  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.applyFilter({ searchTerm: '', filterWorkoutType: '' }); //apply filter 
    this.users = this.getUniqueUsers(); 
    this.selectedUser = this.users[0];
    this.initializeChart();
    this.selectUser(this.selectedUser);
  }

  //clean up when component is destroyed
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // apply name and workout filter to list 
  applyFilter(filter: { searchTerm: string; filterWorkoutType: string }) {
    this.filteredWorkouts = this.workouts
      .filter(
        (workout) =>
          workout.name
            .toLowerCase()
            .includes(filter.searchTerm.toLowerCase()) &&
          (filter.filterWorkoutType === '' ||
            workout.workoutType.toLowerCase() ===
              filter.filterWorkoutType.toLowerCase())
      )
      .slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
  }

  //go to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilter({ searchTerm: '', filterWorkoutType: '' });
    }
  }

  //go to next page
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.workouts.length) {
      this.currentPage++;
      this.applyFilter({ searchTerm: '', filterWorkoutType: '' });
    }
  }


  getUniqueUsers(): any[] {
    const userNames = [
      ...new Set(this.workouts.map((workout) => workout.name)),
    ];
    return userNames.map((name) => ({
      name,
      workouts: this.workouts.filter((workout) => workout.name === name),
    }));
  }

  //select user and update chart
  selectUser(user: any): void {
    this.selectedUser = user;
    this.updateChart();
  }

  //Initialize chart using chart.js
  initializeChart(): void {
    Chart.register(...registerables); // Register Chart.js components

    const ctx = document.getElementById('userChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Workout Minutes',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });
  }


  //update chart.js with users data
  updateChart(): void {
    if (this.chart) {
      const labels = this.selectedUser.workouts.map(
        (workout: any) => workout.workoutType
      );
      const data = this.selectedUser.workouts.map(
        (workout: any) => workout.minutes
      );

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}

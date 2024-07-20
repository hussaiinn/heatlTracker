import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-search-filter',
  standalone: true,
  templateUrl: './workout-search-filter.component.html',
  styleUrls: ['./workout-search-filter.component.css'],
  imports: [FormsModule],
})
export class WorkoutSearchFilterComponent {
  //Define properties
  searchTerm: string = '';
  filterWorkoutType: string = '';

  //EventEmitter
  @Output() filterChanged: EventEmitter<{
    searchTerm: string;
    filterWorkoutType: string;
  }> = new EventEmitter();

  //Manage when filter changes
  onFilterChanged() {
    this.filterChanged.emit({
      searchTerm: this.searchTerm,
      filterWorkoutType: this.filterWorkoutType,
    });
  }
}

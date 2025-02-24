import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
// import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  searchQuery: string = '';
  items: string[] = ['Organizer 1', 'Event 1', 'Attendee 1', 'Event 2', 'Organizer 2'];
  filteredItems: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // Subscribe to search query changes
    
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item => 
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


 public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Sales' },
      { data: [28, 48, 40, 19, 86], label: 'Revenue' }
    ]
  };

}

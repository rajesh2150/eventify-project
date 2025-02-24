import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class OrganizerReportsComponent {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
 
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
   
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Users' },
      { data: [28, 48, 40, 19, 86], label: 'Revenue' }
    ]
  };
}

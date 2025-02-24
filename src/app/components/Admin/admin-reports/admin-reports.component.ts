import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent {
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

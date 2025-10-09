import { Component } from '@angular/core';
import { AdventureWorksService } from './adventureworks.service';
import type { PivotGridDataSource } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AdventureWorksService],
})
export class AppComponent {
  title = 'Getting Started with DevExtreme Angular PivotGrid';

  dataSource: PivotGridDataSource;

  constructor(service: AdventureWorksService) {
    this.dataSource = service.getPivotGridDataSource();
  }

  exportGrid(e: any): void {
    // Export functionality can be implemented here
    // For this example, we'll just prevent the default export
    e.cancel = true;
    // eslint-disable-next-line no-console
    console.log('Export functionality can be implemented using DevExtreme export capabilities');
  }
}

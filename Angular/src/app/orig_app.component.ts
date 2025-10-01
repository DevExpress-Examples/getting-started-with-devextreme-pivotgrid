import { Component } from '@angular/core';
import { AdventureWorksService, PivotGridDataSource } from './adventureworks.service';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AdventureWorksService]
})
export class AppComponent {
  title = 'Getting Started with DevExtreme PivotGrid';
  dataSource: PivotGridDataSource;
  constructor(service: AdventureWorksService) {
    this.dataSource = service.getPivotGridDataSource();
  }
  exportGrid(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sales');
    
    exportPivotGrid({
        component: e.component,
        worksheet: worksheet
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
        });
    });
    e.cancel = true;
  }
}

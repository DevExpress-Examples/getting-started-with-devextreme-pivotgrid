import { Component, ChangeDetectionStrategy } from '@angular/core';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'devextreme-exceljs-fork';
import { saveAs } from 'file-saver';
import { AdventureWorksService } from './adventureworks.service';
import type { PivotGridDataSource } from './app.types';

import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';

@Component({
    selector: 'app-root',
    imports: [DxPivotGridModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [AdventureWorksService],
})
export class AppComponent {
  title = 'Getting Started with DevExtreme Angular PivotGrid';

  dataSource: PivotGridDataSource;

  constructor(service: AdventureWorksService) {
    this.dataSource = service.getPivotGridDataSource();
  }

  exportGrid(e: any): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sales');

    exportPivotGrid({
      component: e.component,
      worksheet,
    }).then(() => workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
    })).catch(() => undefined);
    e.cancel = true;
  }
}

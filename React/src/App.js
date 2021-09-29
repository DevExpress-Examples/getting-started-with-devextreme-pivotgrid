import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

import {
    PivotGrid,
    FieldPanel,
    // FieldChooser,
    Export
} from 'devextreme-react/pivot-grid';

import AdventureWorksService from './adventureworks.service';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

const dataSource = AdventureWorksService.getPivotGridDataSource();
const exportGrid = (e) => {
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

function App() {
  return (
      <PivotGrid
        id="pivotGrid"
        dataSource={dataSource}
        allowSorting={true}
        allowSortingBySummary={true}
        allowFiltering={true}
        onExporting={exportGrid}>
        <FieldPanel
            visible={true}
            showFilterFields={false}
        />
        {/* 
        <FieldChooser
            Configuration options go here
        />
        */}
        <Export enabled={true} />
      </PivotGrid>
  );
}

export default App;

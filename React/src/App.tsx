import { useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import PivotGrid, {
  FieldPanel,
  FieldChooser,
  Export,
} from 'devextreme-react/pivot-grid';
import type { PivotGridTypes } from 'devextreme-react/pivot-grid';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'devextreme-exceljs-fork';
import { saveAs } from 'file-saver';
import AdventureWorksService from './adventureworks.service';

const dataSource = AdventureWorksService.getPivotGridDataSource();

function App(): JSX.Element {
  const exportGrid = useCallback((e: PivotGridTypes.ExportingEvent) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sales');

    exportPivotGrid({
      component: e.component,
      worksheet,
    }).then(() => workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
    })).catch(() => undefined);
    e.cancel = true;
  }, []);

  return (
    <PivotGrid
      id="pivot-grid"
      dataSource={dataSource}
      allowSorting={true}
      allowSortingBySummary={true}
      allowFiltering={true}
      onExporting={exportGrid}>
      <FieldPanel
        visible={true}
        showFilterFields={false}
      />
      <FieldChooser
        allowSearch={true}
      />
      <Export enabled={true} />
    </PivotGrid>
  );
}

export default App;

<script setup lang="ts">
import {
  DxPivotGrid,
  DxFieldPanel,
  DxFieldChooser,
  DxExport,
} from 'devextreme-vue/pivot-grid';
import type { DxPivotGridTypes } from 'devextreme-vue/pivot-grid';
import AdventureWorksService from '../adventureworks.service';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'devextreme-exceljs-fork';
import { saveAs } from 'file-saver';

const dataSource = AdventureWorksService.getPivotGridDataSource() as any;

const handleExporting = (e: DxPivotGridTypes.ExportingEvent): void => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sales');

  exportPivotGrid({
    component: e.component,
    worksheet,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
    });
  });
  e.cancel = true;
};
</script>

<template>
  <DxPivotGrid
    id="pivot-grid"
    :data-source="dataSource"
    :allow-sorting="true"
    :allow-sorting-by-summary="true"
    :allow-filtering="true"
    @exporting="handleExporting"
  >
    <DxFieldPanel
      :visible="true"
      :show-filter-fields="false"
    />
    <DxFieldChooser :allow-search="true"/>
    <DxExport :enabled="true"/>
  </DxPivotGrid>
</template>

<style scoped>
#pivot-grid {
  height: 70vh;
}
</style>

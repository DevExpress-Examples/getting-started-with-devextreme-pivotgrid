<template>
    <DxPivotGrid
        id="pivotGrid"
        :data-source="dataSource"
        :allow-sorting="true"
        :allow-sorting-by-summary="true"
        :allow-filtering="true"
        @exporting="exportGrid">
        <DxFieldPanel
            :visible="true"
            :show-filter-fields="false"
        />
        <!-- <DxFieldChooser
            Configuration options go here
        /> -->
        <DxExport :enabled="true" />
    </DxPivotGrid>
</template>

<script>
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'

import {
    DxPivotGrid,
    DxFieldPanel,
    // DxFieldChooser,
    DxExport
} from 'devextreme-vue/pivot-grid';
import AdventureWorksService from './adventureworks.service';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

export default {
  name: 'Getting Started with DevExtreme PivotGrid',
  components: {
    DxPivotGrid,
    DxFieldPanel,
    // DxFieldChooser,
    DxExport
  },
  data() {
      return {
          dataSource: AdventureWorksService.getPivotGridDataSource()
      }
  },
  methods: {
      exportGrid (e) {
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
}
</script>

<style>
#pivotGrid {
    height: 70vh;
}
</style>

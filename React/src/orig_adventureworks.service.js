import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

const dataSource = new PivotGridDataSource({
  store: {
    type: "xmla",
    url: "https://demos.devexpress.com/Services/OLAP/msmdpump.dll",
    catalog: "Adventure Works DW Standard Edition",
    cube: "Adventure Works"
  },
  fields: [{
    dataField: "[Product].[Category]",
    area: "row",
    sortBySummaryField: "[Measures].[Sales Amount]",
    sortOrder: "desc"
  }, {
    dataField: "[Product].[Subcategory]",
    area: "row",
    sortBySummaryField: "[Measures].[Sales Amount]",
    sortOrder: "desc"
  }, {
    dataField: "[Ship Date].[Calendar Year]",
    area: "column",
    filterValues: [["CY 2003"], ["CY 2004"]]
  }, {
    dataField: "[Ship Date].[Month of Year]",
    area: "column"
  }, {
    dataField: "[Measures].[Sales Amount]",
    area: "data",
    format: "currency"
  }, {
    dataField: "[Measures].[Tax Amount]",
    area: "data",
    format: "currency"
  }]
});

export default {
  getPivotGridDataSource() {
    return dataSource;
  }
}

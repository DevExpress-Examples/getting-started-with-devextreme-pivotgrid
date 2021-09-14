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
    area: "row"
  },
  // Group Data
  {
    dataField: "[Product].[Subcategory]",
    area: "row"
  }, {
    dataField: "[Ship Date].[Calendar Year]",
    area: "column",
    // Filter Data
    filterValues: [["CY 2003"], ["CY 2004"]]
  },
  // Group Data
  {
    dataField: "[Ship Date].[Month of Year]",
    area: "column"
  },
  // Configure Summaries
  {
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

$(function () {
    $("#pivotGridContainer").dxPivotGrid({
        // Bind to Data
        dataSource: {
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
        },
        // Sort Data - By Field Values
        allowSorting: true,
        // Sort Data - By Summary Values
        allowSortingBySummary: true,
        // Filter Data
        allowFiltering: true,
        // Display the Field Panel
        fieldPanel: {
            visible: true,
            showFilterFields: false
        },
        // Configure the Field Chooser
        // fieldChooser: {
        //     enabled: true
        // },
        // Export to Excel
        export: {
            enabled: true
        },
        onExporting: function(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sales');
            
            DevExpress.excelExporter.exportPivotGrid({
                component: e.component,
                worksheet: worksheet
            }).then(function() {
                workbook.xlsx.writeBuffer().then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
                });
            });
            e.cancel = true;
        }
    });  
});
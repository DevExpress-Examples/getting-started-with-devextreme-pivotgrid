$(function () {
    $("#pivotGrid").dxPivotGrid({
        dataSource: {
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
                // Filter Data
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
            }],
            retrieveFields: false
        },
        allowSorting: true,
        allowSortingBySummary: true,
        allowFiltering: true,
        fieldPanel: {
            visible: true,
            showFilterFields: false
        },
        // fieldChooser: {
        //     Configuration options go here
        // },
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
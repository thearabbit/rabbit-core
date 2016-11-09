export const tabularOpts = {
    pagingType: "full_numbers",
    autoWidth: false,
    responsive: true,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [[1, 'desc']],
    // tableTools: {
    //     "sSwfPath": "/swf/copy_csv_xls_pdf.swf"
    // },
    // dom: 'Bfrtip',
    // buttons: ['copy', 'csv']
    // other properties...
    buttonContainer: '.col-sm-6:eq(0)',
    buttons: [
        'copy',
        'excel',
        'csv',
        // 'colvis'
    ]

};

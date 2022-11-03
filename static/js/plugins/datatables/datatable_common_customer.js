"use strict";
let tableCommonCustomer = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            (t = document.querySelector("#table_common_customer")) && ((e = $(t).DataTable({
                info: !1,
                ordering: false,
                order: false,
                bSortable: false,
                pageLength: 50,
                aLengthMenu: [50, 100, 200, 500],
                stateSave: true,
                 stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                scrollX: true,
                dom: 'Brt<"bottom"<"d-flex justify-content-between"lp>>',
                buttons: [
                    {
                        extend: 'excel',
                        title: '',
                        exportOptions: {
                            columns: [1, 2, 3, 4]
                        },
                        customize: function (xlsx) {
                            $( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', 'Доожности' );
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columnDefs: [{orderable: false, targets: 0}, {orderable: false, targets: 1,},
                    {orderable: false, targets: 2,}, {orderable: false, targets: 3,}],
            })).on("draw", (function () {
                o()
            })),
            document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
               e.column(5).search(t.target.value).draw()
            })), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableCommonCustomer.init()
}));

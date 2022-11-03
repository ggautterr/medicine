"use strict";
let tableVehicleRepair = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (t = document.querySelector("#table_vehicle_repair")) && ((e = $(t).DataTable({
                info: !1,
                order: [],
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
                            columns: [0, 1, 2, 3, 4]
                        },
                        customize: function (xlsx) {
                            $( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', 'Плановый ремонт' );
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}]
            })).on("draw", (function () {
                o()
            })), document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
                e.search(t.target.value).draw()
            })), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableVehicleRepair.init()
}));

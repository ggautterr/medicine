"use strict";
let tableConstructionWorker = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (t = document.querySelector("#table_construction_worker")) && ((e = $(t).DataTable({
                info: !1,
                order: [0, "asc"],
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
                            columns: [0, 1, 2, 3]
                        },
                        customize: function (xlsx) {
                            $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Сотрудники');
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columnDefs: [
                   {orderable: 1, targets: 0}, {orderable: 1, targets: 1}, {orderable: !1, targets: '_all'}]
            })).on("draw", (function () {
                o()
            })), document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
                e.search(t.target.value).draw()
            })),
                (() => {
                    const t = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
                    $(t).on("change", (t => {
                        let o = t.target.value;
                        let filter = function (settings, searchData, index, rowData) {
                            let $td = table.row(index).nodes().to$().find('td:eq(1)');
                            return $td.find('.filter').length;
                        }
                        "all" === o && (o = ""), e.search(o).draw()
                    }))
                })(), o())
        }
    }
}();

function MergeGridCells() {
    let dimension_col = null;
    for (dimension_col = 0; dimension_col < 2; dimension_col++) {

        let first_instance = null;
        let rowspan = 1;

        $("#table_construction_worker").find('tr').each(function () {

            let dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

            if (first_instance == null) {
                first_instance = dimension_td;
            } else if (dimension_td.text() === first_instance.text()) {

                dimension_td.remove();
                ++rowspan;
                first_instance.attr('rowspan', rowspan);
            } else {
                first_instance = dimension_td;
                rowspan = 1;
            }
        });
    }
}

KTUtil.onDOMContentLoaded((function () {
    tableConstructionWorker.init();
    MergeGridCells();
}));

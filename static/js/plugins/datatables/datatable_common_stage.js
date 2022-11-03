"use strict";
let tableCommonStage = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            (e = document.querySelector("#table_common_stage")) && (e.querySelectorAll("tbody tr"), t = $(e).DataTable({
                info: !1,
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
                            columns: [0, 1, 2]
                        },
                        customize: function (xlsx) {
                            $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Этапы');
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                                $('row c[r^="C"]', sheet).each(function () {
                                    if ($('is t', this)) {
                                        $(this).attr('s', '55');
                                    }
                                });
                            }

                            $('row c[r*="1"]', sheet).attr('s', '2');

                        }
                    }
                ],
                columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}],
                order: [[0, 'asc']]
            }), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableCommonStage.init()
}));
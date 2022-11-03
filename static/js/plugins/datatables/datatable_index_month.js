"use strict";
let tableMonth = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (e = document.querySelector("#table_month")) && (e.querySelectorAll("tbody tr"), t = $(e).DataTable({
                info: !1,
                pageLength: 5,
                scrollX: true,
                scrollCollapse: true,
                deferRender: true,
                bInfo: false,
                stateSave: true,
                 stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                bLengthChange: false,
                columnDefs: [{orderable: 1, targets: '_all'}],
                order: [[0, 'asc']]
            }), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableMonth.init()
}));
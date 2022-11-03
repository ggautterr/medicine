"use strict";
let tableWeek = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (e = document.querySelector("#table_week")) && (e.querySelectorAll("tbody tr"), t = $(e).DataTable({
                info: !1,
                pageLength: 5,
                scrollX: true,
                scrollCollapse: true,
                bInfo: false,
                bLengthChange: false,
                stateSave: true,
                 stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                columnDefs: [{orderable: 1, targets: '_all'}],
                order: [[0, 'asc']]
            }), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableWeek.init()
}));
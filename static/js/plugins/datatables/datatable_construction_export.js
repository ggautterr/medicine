"use strict";
let tableConstructionExport = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            (t = document.querySelector("#table_construction_export")) && ((e = $(t).DataTable({
                info: !1,
                ordering: false,
                order: false,
                bSortable: false,
                searching: false,
                bLengthChange: false,
                bPaginate: false,
                dom: 'Brt<"bottom"<"d-flex justify-content-between"lp>>',
                buttons: [
                    {
                        extend: 'excel',
                        title: '',
                        text: 'Export объектов',
                        className: 'btn-light',
                    }
                ],
                columnDefs: [{orderable: false, targets: "_all"}]
            })).on("draw", (function () {
                o()
            })), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableConstructionExport.init()
}));

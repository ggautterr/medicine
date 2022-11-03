"use strict";
let tableContractPaymentPrognoz = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (t = document.querySelector("#table_contract_payment_prognoz")) && ((e = $(t).DataTable({
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
                dom: 'rt<"bottom"<"d-flex justify-content-between"lp>>',
                columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}]
            })).on("draw", (function () {
                o()
            })), document.querySelector('[data-table-search-prognoz="search"]').addEventListener("keyup", (function (t) {
                e.search(t.target.value).draw()
            })), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableContractPaymentPrognoz.init()
}));

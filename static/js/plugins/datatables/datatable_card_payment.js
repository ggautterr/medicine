"use strict";
let tableCardPayment = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (t = document.querySelector("#table_card_payment")) && ((e = $(t).DataTable({
                info: !1,
                order: [0, 'desc'],
                scrollX: true,
                pageLength: 50,
                aLengthMenu: [50, 100, 200, 500],
                stateSave: true,
                 stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                dom: 'rt<"bottom"<"d-flex justify-content-between"lp>>',
                columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}]
            })).on("draw", (function () {
                o()
            })), document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
                e.search(t.target.value).draw()
            })), (() => {
                const t = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
                $(t).on("change", (t => {
                    let o = t.target.value;
                    "all" === o && (o = ""), e.column(3).search(o).draw()
                }))
            })(), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableCardPayment.init()
}));

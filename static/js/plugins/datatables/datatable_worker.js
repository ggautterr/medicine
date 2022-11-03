"use strict";
let tableWorker = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            (t = document.querySelector("#table_worker")) && ((e = $(t).DataTable({
                info: !1,
                ordering: false,
                order: false,
                bSortable: false,
                pageLength: 60,
                aLengthMenu: [60, 120, 300, 600],
                stateSave: true,
                 stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                scrollX: true,
                dom: 'rt<"bottom"<"d-flex justify-content-between"lp>>',
                columnDefs: [{orderable: false, targets: 0}, {orderable: false, targets: 1,},
                    {orderable: false, targets: 2,}, {orderable: false, targets: 3,},
                    {orderable: false, targets: 4,}, {orderable: false, targets: 5,}]
            })).on("draw", (function () {
                o()
            })),
                document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
                    e.column(5).search(t.target.value).draw()
                })), e.on('click', 'td.dt-control', function () {
                let first_id = this.id + '-first_row'
                let second_id = this.id + '-second_row'
                let main_id = this.id + '-main_row'
                let first_tr = $(`#${first_id}`);
                let second_tr = $(`#${second_id}`);
                let main_tr = $(`#${main_id}`);
                if (first_tr.hasClass('hideRow')) {
                    first_tr.removeClass('hideRow');
                    second_tr.removeClass('hideRow');
                    main_tr.addClass('dt-hasChild');

                } else {
                    first_tr.addClass('hideRow');
                    second_tr.addClass('hideRow');
                    main_tr.removeClass('dt-hasChild');

                }

            }),
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

KTUtil.onDOMContentLoaded((function () {
    tableWorker.init()
}));

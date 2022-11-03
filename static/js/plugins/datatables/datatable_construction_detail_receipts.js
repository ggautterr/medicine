"use strict";

// Для сортировки столбца, где сумма
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "formatted-num-pre": function (a) {
        a = (a === "-" || a === "") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },

    "formatted-num-asc": function (a, b) {
        return a - b;
    },

    "formatted-num-desc": function (a, b) {
        return b - a;
    }
});

function format(id) {
    let first_id = id + '-first_row';
    let second_id = id + '-second_row';
    let childData = document.getElementById(`${first_id}`);
    let childData2 = document.querySelectorAll(`.${second_id}`)
    let t = `<table style="background-color: #f5f5f5; width: 100%">${childData.innerHTML}</table>`;

    childData2.forEach(function (userItem) {
        t += `<table style="background-color: #f5f5f5; width: 100%">${userItem.innerHTML}</table>`;
    });

    return t;
}

let tableConstructionReceipt = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            $.fn.dataTable.moment('DD.MM.YYYY');
            (t = document.querySelector("#table_construction_receipts")) && ((e = $(t).DataTable({
                info: !1,
                order: [[1, "asc"]],
                lengthChange: false,
                bPaginate: false,
                scrollX: true,
                footerCallback: function () {
                    let api = this.api();


                    // Remove the formatting to get integer data for summation
                    let intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    // Total over all pages
                    let total = api
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(parseInt(b.trim().replace(/\D/g, '')));
                        }, 0);

                    // Update footer
                    $(api.column(2).footer()).html(
                        total.toString().slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сўм'
                    );
                },

                dom: 'rt',
                initComplete: function (settings, json) {
                    $('.cardOpacity').css('opacity', '1');
                },
                columnDefs: [{orderable: !1, targets: 0}, {orderable: 1, targets: 1},
                    {orderable: 1, type: 'formatted-num', targets: 2},
                    {orderable: !1, targets: 3}, {orderable: 1, targets: 4},
                    {orderable: !1, targets: 5}, {orderable: !1, targets: 6}]
            })).on("draw", (function () {
                o()
            })),
                e.on('click', 'td.dt-control', function () {

                    let tr = $(this).closest('tr');
                    let row = e.row(tr);

                    if (row.child.isShown()) {
                        row.child.hide();
                        tr.removeClass('shown');
                    } else {
                        row.child(format(this.id)).show();
                        tr.addClass('shown');
                        updateProduct();
                        deleteProduct();
                    }
                }),
                o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableConstructionReceipt.init()
}));

"use strict";
let tableCompanyExpenseDetail = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            (t = document.querySelector("#table_company_expense_detail")) && ((e = $(t).DataTable({
                info: !1,
                pageLength: 60,
                aLengthMenu: [60, 120, 300, 600],
                stateSave: true,
                stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
                scrollX: true,
                footerCallback: function (row, data, start, end, display) {
                    let api = this.api();

                    // Remove the formatting to get integer data for summation
                    let intVal = function (i) {
                        return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                    };

                    let old_income
                    let income = api
                        .column(3)
                        .data()
                        .reduce(function (a, b, c) {
                            if (display.includes(c)) {
                                old_income = intVal(a) + intVal(parseInt(data[c][3].trim().split(',')[0].replace(/\D/g, '')));
                                return old_income;
                            } else {
                                if (old_income === undefined) {
                                    return 0;
                                } else {
                                    return old_income;
                                }
                            }
                        }, 0);

                    let old_expense
                    let expense = api
                        .column(4)
                        .data()
                        .reduce(function (a, b, c) {
                            if (display.sort().includes(c)) {
                                old_expense = intVal(a) + intVal(parseInt(data[c][4].trim().split(',')[0].replace(/\D/g, '')));
                                return old_expense;
                            } else {
                                if (old_expense === undefined) {
                                    return 0;
                                } else {
                                    return old_expense;
                                }
                            }
                        }, 0);

                    let old_new_expense
                    let new_expense = api
                        .column(5)
                        .data()
                        .reduce(function (a, b, c) {
                            if (display.sort().includes(c)) {
                                old_new_expense = intVal(a) + intVal(parseInt(data[c][5].trim().split(',')[0].replace(/\D/g, '')));
                                return old_new_expense;
                            } else {
                                if (old_new_expense === undefined) {
                                    return 0;
                                } else {
                                    return old_new_expense;
                                }
                            }
                        }, 0);

                    if (income === 0) {
                        income = '0';
                    }
                    if (expense === 0) {
                        expense = '0';
                    }
                    if (new_expense === 0) {
                        new_expense = '0';
                    }

                    // Update footer
                    $(api.column(3).footer()).html(
                        income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сўм'
                    );

                    $(api.column(4).footer()).html(
                        expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сўм'
                    );

                    $(api.column(5).footer()).html(
                        new_expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сўм'
                    );
                },
                dom: 'Brt<"bottom"<"d-flex justify-content-between"lp>>',
                buttons: [
                    {
                        extend: 'excel',
                        title: `${document.title}`,
                        text: 'Excel',
                        footer: true,
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7],
                            format: {
                                body: function (data, row, column, node) {
                                    if (column === 3 || column === 4 || column === 5){
                                        return data.replace(',', '.').replace(/[^\d.]/ig, '');
                                    }
                                    else if (column === 7){
                                        return node.textContent.trim();
                                    }
                                    else {
                                        return data;
                                    }

                                }

                            }
                        },
                        className: 'worker_export',
                        customize: function (xlsx) {
                            const value_select = $('#szn').val();
                            if (value_select === '1') {
                                $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', `Затраты компании ZBI`);
                            } else {
                                $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', `Затраты компании NFT`);
                            }

                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            $('row c[r*="2"]', sheet).attr('s', '2');
                            for (let i = 3; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columnDefs: [
                    {orderable: true, targets: 0}, {orderable: true, targets: 1}, {orderable: false, targets: 2},
                    {orderable: true, targets: 3}, {orderable: true, targets: 4}, {orderable: true, targets: 5},
                    {orderable: true, targets: 6}, {orderable: false, targets: 7}, {orderable: false, targets: 8},
                    {orderable: false, targets: 9}],
            })).on("draw", (function () {
                o()
            })),
                (() => {
                    e.column(9).search('1').draw() // Default ZBI
                    const t = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
                    const tt = document.querySelector('[data-kt-ecommerce-product-filter="select"]');
                    $(t).on("change", (t => {
                        let o = t.target.value;
                        "all" === o && (o = ""), e.column(8).search(o).draw()
                    }))
                    $(tt).on("change", (t => {
                        let o = t.target.value;
                        "all" === o && (o = ""), e.column(9).search(o).draw()
                    }))
                })(), o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableCompanyExpenseDetail.init()
}));

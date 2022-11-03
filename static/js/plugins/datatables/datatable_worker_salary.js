"use strict";
let tableWorkerSalary = function () {
    let t, e, o = () => {};
    return {
        init: function () {
            (t = document.querySelector("#table_worker_salary")) && ((e = $(t).DataTable({
                info: !1,
                order: [],
                pageLength: 60,
                aLengthMenu: [60, 120, 300, 600],
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
                            columns: [1, 2, 3, 4]
                        },
                        customize: function (xlsx) {
                            $( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', 'Зарплата' );
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}]
            })).on("draw", (function () {
                o()
            })), e.on('click', 'td.salary_c', function () {
                let first_id_salary = this.id + '-first_row_salary';
                let second_id_salary = this.id + '-second_row_salary';
                let third_id_salary = this.id + '-third_row_salary';
                let main_id_salary = this.id + '-main_row_salary'
                let first_tr_salary = $(`#${first_id_salary}`);
                let second_tr_salary = $(`#${second_id_salary}`);
                let third_tr_salary = $(`#${third_id_salary}`);
                let main_tr_salary = $(`#${main_id_salary}`);
                if (first_tr_salary.hasClass('hideRow')) {
                    first_tr_salary.removeClass('hideRow');
                    second_tr_salary.removeClass('hideRow');
                    third_tr_salary.removeClass('hideRow');
                    main_tr_salary.addClass('dt-hasChild');

                } else {
                    first_tr_salary.addClass('hideRow');
                    second_tr_salary.addClass('hideRow');
                    third_tr_salary.addClass('hideRow');
                    main_tr_salary.removeClass('dt-hasChild');

                }

            }), e.on('click', 'td.not_salary_c', function () {
                let first_id = this.id + '-first_row';
                let second_id = this.id + '-second_row';
                let third_id = this.id + '-third_row';
                let main_id = this.id + '-main_row'
                let first_tr = $(`#${first_id}`);
                let second_tr = $(`#${second_id}`);
                let third_tr = $(`#${third_id}`);
                let main_tr = $(`#${main_id}`);
                if (first_tr.hasClass('hideRow')) {
                    first_tr.removeClass('hideRow');
                    second_tr.removeClass('hideRow');
                    third_tr.removeClass('hideRow');
                    main_tr.addClass('dt-hasChild');

                } else {
                    first_tr.addClass('hideRow');
                    second_tr.addClass('hideRow');
                    third_tr.addClass('hideRow');
                    main_tr.removeClass('dt-hasChild');

                }

            }),o())
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableWorkerSalary.init()
}));

"use strict";
let tableStoreIncomeExpense = function () {
    let t, e, o = () => {
    };
    return {
        init: function () {
            const url = window.location.href;
            const queryUrl = new URL(url);
            let param = '';
            if (queryUrl.searchParams.get("id")) {
                param = `&id=${queryUrl.searchParams.get("id")}`;
            }
            (t = document.querySelector("#table_income_expense")) && ((e = $(t).DataTable({
                serverSide: true,
                info: !1,
                ajax: `/api/v1/store/income_expense_item/list/?format=datatables${param}`,
                columnDefs: [
                    {orderable: true, targets: 0}, {orderable: false, targets: 1}, {orderable: true, targets: 2},
                    {orderable: false, targets: 3}, {orderable: false, targets: 4}, {orderable: false, targets: 5},
                    {orderable: false, targets: 6}, {orderable: false, targets: 7}, {orderable: false, targets: 8}],
                pageLength: 50,
                aLengthMenu: [50, 100, 200, 500],
                scrollX: true,
                dom: 'Brt<"bottom"<"d-flex justify-content-between"lp>>',
                buttons: [
                    {
                        extend: 'excel',
                        title: '',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        },
                        customize: function (xlsx) {
                            $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Товары');
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let rows = $('row', sheet);

                            $('row c[r*="1"]', sheet).attr('s', '2');
                            for (let i = 2; i <= rows.length; i++) {
                                $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                            }

                        }
                    }
                ],
                columns: [
                    {'data': 'item.name'},
                    {'data': 'item.description'},
                    {'data': 'qty'},
                    {'data': 'item.unit.name'},
                    {'data': 'type', 'visible': false},
                    {'data': 'type_display_name'},
                    {
                        'data': 'date',
                        "render": function (data) {
                            return moment(data).format('MM-DD-Y');
                        }
                    },
                    {'data': 'comment'},
                    {
                        'data': 'income_or_expense_id',
                        "render": function (data, type, row) {
                            if (row["type"] === 'Приход') {
                                data = '<div class="text-end">\n' +
                                    `<a data-url="/api/v1/store/income_item/${data}/"\n` +
                                    'data-bs-toggle="modal" data-bs-target="#update_income"\n' +
                                    'class="btn btn-sm btn-icon btn-clear btn-active-light-primary update_income">\n' +
                                    '<span class="svg-icon svg-icon-2 m-0">\n' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
                                    'viewBox="0 0 24 24" fill="none">\n' +
                                    '<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd"\n' +
                                    'd="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '<path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '<path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '</svg>\n' +
                                    '</span>\n' +
                                    '</a>\n' +
                                    `<a data-url="/api/v1/store/income_item/${data}/"\n` +
                                    'data-bs-toggle="modal" data-bs-target="#delete_income"\n' +
                                    'class="btn btn-sm btn-icon btn-clear btn-active-light-primary delete_income">\n' +
                                    '<span class="svg-icon svg-icon-3">\n' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24"\n' +
                                    'height="24" viewBox="0 0 24 24" fill="#a51330">\n' +
                                    '<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"\n' +
                                    'fill="#a51330"></path>\n' +
                                    '<path opacity="0.5"\n' +
                                    'd="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"\n' +
                                    'fill="#a51330">\n' +
                                    '</path>\n' +
                                    '<path opacity="0.5"\n' +
                                    'd="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"\n' +
                                    'fill="#a51330">\n' +
                                    '</path>\n' +
                                    '</svg>\n' +
                                    '</span>\n' +
                                    '</a>\n' +
                                    '</div>';
                            }
                            if (row["type"] === 'Расход') {
                                data = '<div class="text-end">\n' +
                                    `<a data-url="/api/v1/store/expense_item/${data}/"\n` +
                                    'data-bs-toggle="modal" data-bs-target="#update_expense"\n' +
                                    'class="btn btn-sm btn-icon btn-clear btn-active-light-primary update_expense">\n' +
                                    '<span class="svg-icon svg-icon-2 m-0">\n' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
                                    'viewBox="0 0 24 24" fill="none">\n' +
                                    '<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd"\n' +
                                    'd="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '<path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '<path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z"\n' +
                                    'fill="#123875"></path>\n' +
                                    '</svg>\n' +
                                    '</span>\n' +
                                    '</a>\n' +
                                    `<a data-url="/api/v1/store/expense_item/${data}/"\n` +
                                    'data-bs-toggle="modal" data-bs-target="#delete_expense"\n' +
                                    'class="btn btn-sm btn-icon btn-clear btn-active-light-primary delete_expense">\n' +
                                    '<span class="svg-icon svg-icon-3">\n' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="24"\n' +
                                    'height="24" viewBox="0 0 24 24" fill="#a51330">\n' +
                                    '<path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"\n' +
                                    'fill="#a51330"></path>\n' +
                                    '<path opacity="0.5"\n' +
                                    'd="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"\n' +
                                    'fill="#a51330">\n' +
                                    '</path>\n' +
                                    '<path opacity="0.5"\n' +
                                    'd="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"\n' +
                                    'fill="#a51330">\n' +
                                    '</path>\n' +
                                    '</svg>\n' +
                                    '</span>\n' +
                                    '</a>\n' +
                                    '</div>';
                            }
                            return data;
                        }
                    },

                ]

            })).on("draw", (function () {
                o()
            })),
                (() => {
                    const t = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
                    $(t).on("change", (t => {
                        let o = t.target.value;
                        let filter = function (settings, searchData, index, rowData) {
                            let $td = table.row(index).nodes().to$().find('td:eq(1)');
                            return $td.find('.filter').length;
                        }
                        "all" === o && (o = ""), e.column(3).search(o).draw()
                    }))
                })(),
                (() => {
                    const t = document.querySelector('[data-kt-ecommerce-product-filter="status1"]');
                    $(t).on("change", (t => {
                        let o = t.target.value;
                        let filter = function (settings, searchData, index, rowData) {
                            let $td = table.row(index).nodes().to$().find('td:eq(1)');
                            return $td.find('.filter').length;
                        }
                        "all" === o && (o = ""), e.column(0).search(o).draw()
                    }))
                })(), o())


            if (url.includes('?')) {
                const newUrl = new URL(url);
                $('#item_filter').val(newUrl.searchParams.get("name")).trigger('change');
            }

        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    tableStoreIncomeExpense.init()
}));

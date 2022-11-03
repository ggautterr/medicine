"use strict";
let tableContractPaymentWithPrognoz = function () {
   let t, e, o = () => {
   };
   return {
      init: function () {
         (t = document.querySelector("#table_contract_payment_with_prognoz")) && ((e = $(t).DataTable({
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
            dom: 'Brt',
            buttons: [
               {
                  extend: 'excel',
                  title: '',
                  text: 'Excel c прогнозами',
                  className: 'payment_with_prognoz',
                  exportOptions: {
                     columns: [0, 1]
                  },
                  customize: function (xlsx) {
                     $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Поступления и прогнозы');
                     let sheet = xlsx.xl.worksheets['sheet1.xml'];
                     let rows = $('row', sheet);

                     $('row c[r*="1"]', sheet).attr('s', '2');
                     for (let i = 2; i <= rows.length; i++) {
                        $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                     }

                     $('row c[r^="A"]', sheet).each(function () {
                        if ($('is t', this).text() === 'Прогнозы') {
                           $(this).attr('s', '2');
                        }
                        if ($('is t', this).text() === 'Поступление') {
                           $(this).attr('s', '2');
                        }
                     });

                       $('row c[r^="B"]', sheet).each(function () {
                        // Get the value
                        if ($('is t', this).text() === 'Период поступления') {
                           $(this).attr('s', '2');
                        }
                     });

                  }
               }
            ],
            columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}]
         })).on("draw", (function () {
            o()
         })), document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
            e.search(t.target.value).draw()
         })), o())
      }
   }
}();

KTUtil.onDOMContentLoaded((function () {
   tableContractPaymentWithPrognoz.init();
}));

"use strict";
let tableWorkerExport = function () {
   let t, e, o = () => {
   };
   return {
      init: function () {
         (t = document.querySelector("#table_worker_export")) && ((e = $(t).DataTable({
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
                  text: 'Excel с окладом',
                  className: 'worker_export',
                  customize: function (xlsx) {
                     $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Анкеты');
                     let sheet = xlsx.xl.worksheets['sheet1.xml'];
                     let rows = $('row', sheet);

                     $('row c[r*="1"]', sheet).attr('s', '2');
                     for (let i = 2; i <= rows.length; i++) {
                        $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                     }

                  }
               },
               {
                  extend: 'excel',
                  title: '',
                  text: 'Excel без оклада',
                  exportOptions: {
                     columns: [0, 1, 2, 3, 4, 5, 7]
                  },
                  className: 'worker_export',
                  customize: function (xlsx) {
                     $('sheets sheet', xlsx.xl['workbook.xml']).attr('name', 'Анкеты');
                     let sheet = xlsx.xl.worksheets['sheet1.xml'];
                     let rows = $('row', sheet);

                     $('row c[r*="1"]', sheet).attr('s', '2');
                     for (let i = 2; i <= rows.length; i++) {
                        $(`row c[r*="${i}"]`, sheet).attr('s', '50');
                     }

                  }
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
   tableWorkerExport.init()
}));

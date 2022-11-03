"use strict";

let tableConstruction = function () {
   let t, e, o = () => {
   };
   return {
      init: function () {
         ((e = $('#table_construction').DataTable({
            info: !1,
            order: [],
            scrollX: true,
            aLengthMenu: [
               [240, 480, 960, -1],
               [60, 120, 240, 'Все'],
            ],
            stateSave: true,
             stateSaveParams: function (settings, data) {
                    delete data.search;
                    delete data.columns;
                },
            dom: 'rt<"bottom"<"d-flex justify-content-between"lp>>',
            columnDefs: [{orderable: 1, targets: 0}, {orderable: !1, targets: '_all'}, {className: 'dt-control'}]
         })).on("draw", (function () {
            o()
         })),
            document.querySelector('[data-table-search="search"]').addEventListener("keyup", (function (t) {
               e.column(5).search(t.target.value).draw()
            })),
            e.on('click', 'td.dt-control', function () {
               let first_id = this.id + '-first_row'
               let second_id = this.id + '-second_row'
               let third_id = this.id + '-third_row'
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

            }),
            (() => {
               const filter = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
               $(filter).on("change", (t => {
                  let o = t.target.value;
                  "all" === o && (o = ""), e.search(o).draw()
               }))
            })(), o())
      }
   }
}();


KTUtil.onDOMContentLoaded((function () {
   tableConstruction.init()
}));

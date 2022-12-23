import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatter,
  Formatters,
  GridOption,
  GridService,
  OnEventArgs,
} from 'angular-slickgrid';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { bill, billSelectReqDto, billSelectResDto } from '../../models/bill';
import { employee } from '../../models/employee';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'main-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private translate: TranslateService,
    private toaster_service: ToastrService,
    private invoice_service: InvoiceService
  ) {}

  invoice_list_angular_grid: AngularGridInstance;
  invoice_list_grid: any;
  invoice_list_grid_service: GridService;
  invoice_list_grid_data_view: any;
  invoice_list_columnDefinitions: Column[] = [];
  invoice_list_gridOptions: GridOption = {};
  invoice_list_dataset: billSelectResDto[] = [];
  selected_invoices: Array<bill> = [];
  invoice_list_grid_updated_object: any;

  /* translaton */
  editToolTip: string = this.translate.instant('GLOBAL.EDIT_TT');
  deleteToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');
  convertDealToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');

  ngOnInit(): void {
    this.prepareGrid();
    this.getData();
  }

  prepareGrid() {
    this.invoice_list_columnDefinitions = [
      {
        name: `<i class="fa fa-pencil" style="color:#D3D3D3; cursor:pointer; justify-align: center;"
         title="${this.editToolTip}" name="${this.editToolTip}" aria-hidden="true"></i>`,
        field: '',
        id: 1,
        formatter: this.contactEditButtonFormat,
        minWidth: 30,
        maxWidth: 35,
        onCellClick: (e, args: OnEventArgs) => {
          this.popupCommon('edit', args.dataContext);
        },
      },
      {
        name: `<span><i class="fa fa-trash" style="color:#D3D3D3;cursor:pointer; justify-align: center;" 
        title="${this.deleteToolTip}" name="${this.deleteToolTip}"></i></span>`,
        field: '',
        id: 2,
        formatter: this.contactDeleteButtonFormat,
        minWidth: 30,
        maxWidth: 35,
        onCellClick: (e, args: OnEventArgs) => {
          this.popupCommon('delete', args.dataContext);
        },
      },
      {
        name: '#',
        field: '',
        id: 4,
        formatter: function (row) {
          return (row + 1).toString();
        },
        width: 40,
      },
      {
        id: 'billno',
        name: 'Bill No',
        field: 'billno',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'billdate',
        name: 'Bill Date',
        field: 'billdate',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        formatter: Formatters.dateEuro,

        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'billref',
        name: 'Bill Reference',
        field: 'billref',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'billamount',
        name: 'Bill Amount',
        field: 'amount',
        type: FieldType.string,
        sortable: true,
        maxWidth: 130,
        filterable: true,
        formatter: this.AmountFormatter,
      },
      {
        id: 'collectedamount',
        name: 'Paid',
        field: 'receivable',
        type: FieldType.string,
        sortable: true,
        maxWidth: 130,
        filterable: true,
        formatter: this.AmountFormatter,
      },
      {
        id: 'salesman',
        name: 'Salesman',
        field: 'empname',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'routename',
        name: 'Route',
        field: 'routename',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'customername',
        name: 'Customer',
        field: 'customername',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
      {
        id: 'duedays',
        name: 'Due Days',
        field: 'duedate',
        type: FieldType.integer,
        sortable: true,
        minWidth: 80,
        filterable: true,
        // filter: { model: Filters.compoundInput },
      },
    ];

    this.invoice_list_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#invoice-grid1-container',
        // sidePadding: 15,
        calculateAvailableSizeBy: 'container',
      },
      // enableTranslate: true,
      // i18n: this.translate as any,

      enableExcelExport: true,
      registerExternalResources: [new ExcelExportService()],

      enableColumnPicker: true,
      enableCellNavigation: true,
      enableFiltering: true,
      enableAutoTooltip: true,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
    };

    // fill the dataset with your data
    this.invoice_list_dataset = [];
  }

  async getData() {
    try {
      var resp: Array<billSelectResDto> = await this.invoice_service.select(
        new billSelectReqDto()
      );
      _.forEach(resp, (item, key) => {
        let dateBill = item.billdate;
        let dueDate = moment().diff(dateBill, 'days');
        resp[key].duedate = dueDate;
      });
      this.invoice_list_dataset = resp;
    } catch (error) {}
  }

  async popupCommon(e: any, args: employee) {
    var text = '';
    if (e == 'delete') {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.invoice_service.delete(args);
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('EMPLOYEE.DELETE_SUCCESS')
            );
            this.getData();
          }
        } catch (error) {}
      } else {
      }
    } else if (e == 'edit') {
      let navigation_extras: NavigationExtras = {
        // relativeTo: this.route,
        queryParams: {
          id: args.id,
        },
      };
      this.router.navigate(['home/invoicemerge'], navigation_extras);
    }
  }

  contactEditButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    return `<i class="fa fa-pencil" style="color:#036BC0;cursor:pointer;justify-align: center;"
       name="tooltip" aria-hidden="true"></i>`;
  };

  contactDeleteButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    return `<i class="fa fa-trash" style="color:red;cursor:pointer;text-align: right"; aria-hidden="true"></i>`;
  };

  goToInvoiceMerge() {
    this.router.navigate(['home/invoicemerge']);
  }

  handleSelectedRowsChanged = (event: any) => {
    this.selected_invoices = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.invoice_list_dataset[v1] != undefined) {
        this.selected_invoices.push(this.invoice_list_dataset[v1]);
      }
    });
  };

  async onContactListGridCellChanged(e: any, args: any) {
    this.invoice_list_grid_updated_object = args.item;
  }
  contactListGridReady(angularGrid: AngularGridInstance) {
    this.invoice_list_angular_grid = angularGrid;
    this.invoice_list_grid_data_view = angularGrid.dataView;
    this.invoice_list_grid = angularGrid.slickGrid;
    this.invoice_list_grid_service = angularGrid.gridService;
  }

  async onBulkDelete() {
    try {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.invoice_service.deleteBulk(
            this.selected_invoices
          );
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('EMPLOYEE.DELETE_SUCCESS')
            );
            this.invoice_list_grid.setSelectedRows([]);
            this.selected_invoices = [];
            this.getData();
          }
        } catch (error) {
          this.toaster_service.error(
            this.translate.instant('EMPLOYEE.DELETE_FAILURE')
          );
        }
      } else {
        this.invoice_list_grid.setSelectedRows([]);
      }
    } catch (error) {}
  }

  AmountFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    if (value == 0) return '';
    else return `<div class='fw-bold text-end'>₹&nbsp;${value}</div>`;
  };
}

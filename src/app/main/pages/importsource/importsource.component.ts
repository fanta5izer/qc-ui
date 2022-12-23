import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  AngularGridInstance,
  Column,
  // ExcelExportService,
  FieldType,
  Filters,
  Formatter,
  Formatters,
  GridOption,
  GridService,
  parseBoolean,
} from 'angular-slickgrid';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { source } from '../../models/source';
import { ImportsourceService } from '../../services/importsource.service';

@Component({
  selector: 'app-importsource',
  templateUrl: './importsource.component.html',
  styleUrls: ['./importsource.component.scss'],
})
export class ImportsourceComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private toasterservice: ToastrService,
    private router: Router,
    private import_service: ImportsourceService
  ) {}

  import_source_list_angular_grid: AngularGridInstance;
  import_source_list_grid: any;
  import_source_list_grid_service: GridService;
  import_source_list_grid_data_view: any;
  import_source_list_columnDefinitions: Column[] = [];
  import_source_list_gridOptions: GridOption = {};
  import_source_list_dataset: source[] = [];
  selected_source: Array<source> = [];
  import_source_list_grid_updated_object: any;

  ngOnInit(): void {
    this.prepareGrid();
  }
  import_source_list_sheet: string = '';

  async onImportSourceListGridCellChanged(e: any, args: any) {
    this.import_source_list_grid_updated_object = args.item;
  }
  ImportSourceListGridReady(angularGrid: AngularGridInstance) {
    this.import_source_list_angular_grid = angularGrid;
    this.import_source_list_grid_data_view = angularGrid.dataView;
    this.import_source_list_grid = angularGrid.slickGrid;
    this.import_source_list_grid_service = angularGrid.gridService;
  }

  handleSelectedRowsChanged = (event: any) => {
    this.selected_source = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.import_source_list_dataset[v1] != undefined) {
        this.selected_source.push(this.import_source_list_dataset[v1]);
      }
    });
  };

  AmountFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return `<div class='fw-bold text-end'>₹&nbsp;${value}</div>`;
  };

  // prepareGrid() {
  //   this.import_source_list_columnDefinitions = [

  //     {
  //       id: 'Beat',
  //       name: 'Beat',
  //       field: 'beat',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'salesman',
  //       name: 'salesman',
  //       field: 'salesman',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'customercode',
  //       name: 'Customer Code',
  //       field: 'customercode',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'customername',
  //       name: 'Customer Name',
  //       field: 'customername',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'documentid',
  //       name: 'Document ID',
  //       field: 'documentid',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'docreference',
  //       name: 'Doc Reference',
  //       field: 'docreference',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'documentdate',
  //       name: 'Document Date',
  //       field: 'documentdate',
  //       type: FieldType.date,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'discount',
  //       name: 'Discount',
  //       field: 'discount',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'discpercentge',
  //       name: 'Discount %',
  //       field: 'discpercentge',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'amount',
  //       name: 'Amount',
  //       field: 'amount',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'outstanding',
  //       name: 'OutStanding',
  //       field: 'outstanding',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'duedays',
  //       name: 'Due Days',
  //       field: 'duedays',
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //   ];

  //   this.import_source_list_gridOptions = {
  //     asyncEditorLoading: false,

  //     // autoHeight:true,
  //     autoResize: {
  //       container: 'import-contact-container',
  //       // sidePadding: 15,
  //     },
  //     enableExcelExport: true,
  //     registerExternalResources: [new ExcelExportService()],
  //     editable: true,
  //     enableAutoResize: true,
  //     enableExport: true,
  //     enableColumnPicker: true,
  //     enableCellNavigation: true,
  //     enableFiltering: true,
  //     enableAutoTooltip: true,
  //     checkboxSelector: {
  //       // you can toggle these 2 properties to show the "select all" checkbox in different location
  //       hideInFilterHeaderRow: false,
  //       hideInColumnTitleRow: true,
  //     },
  //     rowSelectionOptions: {
  //       // True (Single Selection), False (Multiple Selections)
  //       selectActiveRow: false,
  //     },
  //     enableCheckboxSelector: true,
  //     enableRowSelection: true,
  //   };
  // }

  prepareGrid() {
    this.import_source_list_columnDefinitions = [
      {
        id: 'InvoiceID',
        name: 'InvoiceID',
        field: 'invoiceid',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'docref',
        name: 'Doc Ref',
        field: 'docref',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'date',
        name: 'Date',
        field: 'invoicedate',
        type: FieldType.date,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        // formatter: Formatters.dateTimeIsoAmPm,
        minWidth: 150,
      },
      {
        id: 'paymentmode',
        name: 'Payment Mode ',
        field: 'paymentmode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'paymentdate',
        name: 'Payment Date',
        field: 'paymentdate',
        type: FieldType.date,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'creditterm',
        name: 'Credit Term',
        field: 'creditterm',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },

      {
        id: 'customerid',
        name: 'CustomerID',
        field: 'customerid',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'customer',
        name: 'Customer',
        field: 'customer',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'alternatecustomername',
        name: 'AlternateCustomerName',
        field: 'alternatecustomername',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'forumcode',
        name: 'Forum Code',
        field: 'forumcode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'goodsvalue',
        name: 'Goods Value',
        field: 'goodsvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'productdiscount',
        name: 'Product Discount',
        field: 'productdiscount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'tradediscount%',
        name: 'Trade Discount%',
        field: 'tradedispercentage',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'tradediscount',
        name: 'Trade Discount',
        field: 'tradedis',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'addldiscount%',
        name: 'Addl Discount%',
        field: 'addldispercentage',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'addldiscount',
        name: 'Addl Discount',
        field: 'addldiscount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'freight',
        name: 'Freight',
        field: 'freight',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'netvalue',
        name: 'Net Value',
        field: 'netvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'netvolume',
        name: 'Net Volume',
        field: 'netvolume',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'AdjRef',
        name: 'Adj Ref',
        field: 'AdjRef',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'adjustedamount',
        name: 'Adjusted Amount',
        field: 'adjustedamount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
        formatter: this.AmountFormatter,
      },
      {
        id: 'balance',
        name: 'Balance',
        field: 'balance',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'collectedamount',
        name: 'Collected Amount',
        field: 'collectedamount',
        type: FieldType.integer,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
        formatter: this.AmountFormatter,
      },
      {
        id: 'branch',
        name: 'Branch',
        field: 'branch',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'beat',
        name: 'Beat',
        field: 'beat',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'salesman',
        name: 'Salesman',
        field: 'salesman',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'reference',
        name: 'Reference',
        field: 'reference',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'roundoff',
        name: 'Round Off',
        field: 'roundoff',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'documenttype',
        name: 'Document Type',
        field: 'documenttype',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'TotalTaxSufferedValue',
        name: 'Total TaxSuffered Value',
        field: 'totaltaxsufferedvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'Total SalesTax Value',
        name: 'totalsalestaxvalue',
        field: 'Total SalesTax Value',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'gstinofoutlet',
        name: 'GSTIN OF Outlet',
        field: 'gstinofoutlet',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'outletstatecode',
        name: 'OutletStateCode',
        field: 'outletstatecode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'tcsrate',
        name: 'TCS Rate',
        field: 'tcsrate',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'tcsamount',
        name: 'TCS Amount',
        field: 'tcsamount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
        formatter: this.AmountFormatter,
      },
      {
        id: 'itemcode',
        name: 'Item Code',
        field: 'itemcode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'itemname',
        name: 'Item Name',
        field: 'itemname',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'batch',
        name: 'Batch',
        field: 'batch',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'reference',
        name: 'Reference',
        field: 'reference',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },

      {
        id: 'quantity',
        name: 'Quantity',
        field: 'quantity',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'volume',
        name: 'Volume',
        field: 'Volume',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'salesprice',
        name: 'Sales Price',
        field: 'salesprice',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'invoiceuom',
        name: 'Invoice UOM',
        field: 'invoiceuom',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'invoiceqty',
        name: 'Invoice Qty',
        field: 'invoiceqty',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'saletax',
        name: 'Sale Tax',
        field: 'saletax',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'taxsuffered',
        name: 'Tax Suffered',
        field: 'taxsuffered',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'discount',
        name: 'Discount',
        field: 'discount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'stcredit',
        name: 'STCredit',
        field: 'stcredit',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'total',
        name: 'Total',
        field: 'total',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'Tax Suffered Value',
        name: 'Tax Suffered Value',
        field: 'taxsufferedvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'salestaxvalue',
        name: 'Sales Tax Value',
        field: 'salestaxvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
      {
        id: 'hsnnumber',
        name: 'HSN Number',
        field: 'hsnnumber',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        minWidth: 150,
      },
    ];

    this.import_source_list_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#source-container',
        // rightPadding:15,
        calculateAvailableSizeBy: 'container',
      },
      enableExcelExport: true,
      registerExternalResources: [new ExcelExportService()],
      editable: true,
      enableAutoResize: true,
      enableExport: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      // enableFiltering: true,
      enableAutoTooltip: true,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: true,
        hideInColumnTitleRow: false,
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
    };
  }

  onClickReset() {
    this.import_source_list_sheet = '';
    this.selected_source = [];
    this.import_source_list_dataset = [];
  }
  // for read excel file

  onFileChange(e: any) {
    let workBook: any = null;
    let json_data = null;
    const reader = new FileReader();
    const file = e.target.files[0];
    this.import_source_list_sheet = e.target.files[0].name;
    reader.onload = (event) => {
      import('xlsx').then((XLSX) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        var header: any = '';
        json_data = workBook.SheetNames.reduce((initial: any, name: any) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet, {
            blankrows: false,
            dateNF: 'yyyy-mm-dd',
            raw: false,
          });

          return initial;
        }, {});
        const dataString = JSON.stringify(json_data);
        var contact_list_import_: Array<any> = [];
        _.forEach(json_data, (v, k) => {
          contact_list_import_ = _.concat(contact_list_import_, v);
        });
        var _temp_source_import_list: source[] = [];
        _.forEach(contact_list_import_, (v, k) => {
          if (v['Item Code'] != 'GrandTotal:') {
            if (v['InvoiceID'] != 'GrandTotal:') {
              let _temp_source = new source();
              _temp_source.invoiceid =
                v['InvoiceID'] != null ? v['InvoiceID'].toString() : '';
              _temp_source.docref =
                v['Doc Ref'] != null ? v['Doc Ref'].toString() : '';
              _temp_source.invoicedate =
                v['Date'] != null ? v['Date'].toString() : '';
              _temp_source.paymentmode =
                v['Payment Mode'] != null ? v['Payment Mode'].toString() : '';
              _temp_source.paymentdate =
                v['Payment Date'] != null ? v['Payment Date'].toString() : '';
              _temp_source.creditterm =
                v['Credit Term'] != null ? v['Credit Term'].toString() : '';
              _temp_source.customerid =
                v['CustomerID'] != null ? v['CustomerID'].toString() : '';
              _temp_source.customer =
                v['Customer'] != null ? v['Customer'].toString() : '';
              _temp_source.alternatecustomername =
                v['AlternateCustomerName'] != null
                  ? v['AlternateCustomerName'].toString()
                  : '';
              _temp_source.billingaddress =
                v['Billing Address'] != null
                  ? v['Billing Address'].toString()
                  : '';
              _temp_source.forumcode =
                v['Forum Code'] != null ? v['Forum Code'].toString() : '';
              _temp_source.goodsvalue =
                v['Goods Value'] != null ? parseFloat(v['Goods Value']) : 0;

              _temp_source.productdis =
                v['Product Discount'] != null
                  ? parseInt(v['Product Discount'])
                  : 0;
              _temp_source.tradedispercentage =
                v['Trade Discount%'] != null
                  ? v['Trade Discount%'].toString()
                  : '';
              _temp_source.tradedis =
                v['Trade Discount'] != null ? parseInt(v['Trade Discount']) : 0;
              _temp_source.addldispercentage =
                v['Addl Discount%'] != null
                  ? v['Addl Discount%'].toString()
                  : '';
              _temp_source.addldis =
                v['Addl Discount'] != null ? parseInt(v['Addl Discount']) : 0;
              _temp_source.freight =
                v['Freight'] != null ? parseInt(v['Freight']) : 0;
              _temp_source.netvalue =
                v['Net Value'] != null ? parseFloat(v['Net Value']) : 0;
              _temp_source.netvolume =
                v['Net Volume'] != null ? parseFloat(v['Net Volume']) : 0;
              _temp_source.adjref =
                v['Adj Ref'] != null ? v['Adj Ref'].toString() : '';
              _temp_source.adjustedamount != null
                ? parseInt(v['Adjusted Amount'])
                : 0;
              _temp_source.balance =
                v['Balance'] != null ? v['Balance'].toString() : '';
              _temp_source.collectedamount != null
                ? parseInt(v['Collected Amount'])
                : '';
              _temp_source.branch =
                v['Branch'] != null ? v['Branch'].toString() : '';
              _temp_source.beat = v['Beat'] != null ? v['Beat'].toString() : '';
              _temp_source.salesman =
                v['Salesman'] != null ? v['Salesman'].toString() : '';
              _temp_source.reference =
                v['Reference'] != null ? v['Reference'].toString() : '';
              _temp_source.roundoff =
                v['Round Off'] != null ? v['Round Off'].toString() : '';
              _temp_source.documenttype =
                v['Document Type'] != null ? v['Document Type'].toString() : '';
              _temp_source.totaltaxsufferedvalue != null
                ? parseInt(v['Total TaxSuffered Value'])
                : 0;
              _temp_source.totalsalestaxvalue != null
                ? parseFloat(v['Total SalesTax Value'])
                : 0;
              _temp_source.gstinofoutlet =
                v['GSTIN OF Outlet'] != null
                  ? v['GSTIN OF Outlet'].toString()
                  : '';
              _temp_source.outletstatecode != null
                ? parseInt(v['OutletStateCode'])
                : '';
              _temp_source.tcsrate =
                v['TCS Rate'] != null ? parseFloat(v['TCS Rate']) : 0;
              _temp_source.tcsamount =
                v['TCS Amount'] != null ? parseFloat(v['TCS Amount']) : 0;
              _temp_source.itemcode =
                v['Item Code'] != null ? v['Item Code'].toString() : '';
              _temp_source.itemname =
                v['Item Name'] != null ? v['Item Name'].toString() : '';
              _temp_source.batch =
                v['Batch'] != null ? v['Batch'].toString() : '';
              _temp_source.quantity =
                v['Quantity'] != null ? parseFloat(v['Quantity']) : 0;
              _temp_source.volume != null ? parseFloat(v['Volume']) : 0;
              _temp_source.salesprice =
                v['Sales Price'] != null ? parseFloat(v['Sales Price']) : 0;
              _temp_source.invoiceuom =
                v['Invoice UOM'] != null ? v['Invoice UOM'].toString() : '';
              _temp_source.invoiceqty =
                v['Invoice Qty'] != null ? parseFloat(v['Invoice Qty']) : 0;
              _temp_source.saletax =
                v['Sale Tax'] != null ? v['Sale Tax'].toString() : '';
              _temp_source.taxsuffered =
                v['Tax Suffered'] != null ? v['Tax Suffered'].toString() : '';
              _temp_source.discount =
                v['Discount'] != null ? v['Discount'].toString() : '';
              _temp_source.stcredit =
                v['STCredit'] != null ? parseInt(v['STCredit']) : 0;
              _temp_source.total =
                v['Total'] != null ? parseFloat(v['Total']) : 0;
              _temp_source.taxsufferedvalue =
                v['Tax Suffered Value'] != null
                  ? parseInt(v['Tax Suffered Value'])
                  : 0;
              _temp_source.salestaxvalue =
                v['Sales Tax Value'] != null
                  ? parseFloat(v['Sales Tax Value'])
                  : 0;
              _temp_source.hsnnumber =
                v['HSN Number'] != null ? v['HSN Number'].toString() : '';

              _temp_source.id = ++k;

              _temp_source.importdate = new Date();
              // _temp_source.documentdate = new Date(_temp_source.documentdate);

              _temp_source.invoicedate = new Date(_temp_source.invoicedate);
              _temp_source.paymentdate = new Date(_temp_source.paymentdate);
              v.id = ++k;
              _temp_source_import_list.push(_temp_source);
            }
          }
        });
        this.import_source_list_dataset = _temp_source_import_list;
        contact_list_import_.forEach((v1, k: any) => {
          this.selected_source.push(k);
        });

        this.import_source_list_grid.setSelectedRows(this.selected_source);
      });
    };
    reader.readAsBinaryString(file);
  }
  // import devices

  async importDevices() {
    if (this.selected_source.length > 0) {
      var contact_list = _.map(this.selected_source, (v: any) => {
        return this.import_source_list_dataset[v];
      });
      var request = new ActionReq<Array<source>>();
      request.item = contact_list;
      try {
        var resp = await this.import_service.ImportBulk(this.selected_source);
        if (resp) {
          this.toasterservice.success(' Imported Successfully');
          this.router.navigate(['home/dashboard'], {});
        }
      } catch (error) {
        throw error;
      }
    }
  }
}

//     _temp_source.salesman =
//       v['Salesman'] != null ? v['Salesman'].toString() : '';

//     _temp_source.customercode =
//       v['CustomerID'] != null ? v['CustomerID'].toString() : '';

//     _temp_source.customername =
//       v['Customer Name'] != null ? v['Customer Name'].toString() : '';
//     _temp_source.documentid =
//       v['Document ID'] != null ? v['Document ID'].toString() : '';
//     _temp_source.docreference =
//       v['Doc Reference'] != null ? v['Doc Reference'].toString() : '';
//     _temp_source.documentdate =
//       v['Document Date'] != null ? v['Document Date'].toString() : '';
//     _temp_source.discount =
//       v['Discount'] != null ? parseInt(v['Discount']) : 0;
//     _temp_source.discpercentge =
//       v['Discount %'] != null ? parseFloat(v['Discount %']) : 0;
//     _temp_source.amount =
//       v['Amount'] != null ? parseFloat(v['Amount']) : 0;
//     _temp_source.outstanding =
//       v['OutStanding'] != null ? parseInt(v['OutStanding']) : 0;
//     _temp_source.duedays =
//       v['Due Days'] != null ? parseInt(v['Due Days']) : 0;
//     _temp_source.id = ++k;
//     _temp_source.importdate = new Date();
//     _temp_source.documentdate = new Date(_temp_source.documentdate);

//     v.id = ++k;
//     _temp_source_import_list.push(_temp_source);
//   }

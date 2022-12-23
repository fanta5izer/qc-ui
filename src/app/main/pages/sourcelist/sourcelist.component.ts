import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
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
import { ToastrService } from 'ngx-toastr';
import { ReferenceService } from 'src/app/core/service/reference.service';
import { customerSelectResDto } from '../../models/customer';
import {
  employee,
  employeeSelectReqDto,
  employeeSelectResDto,
} from '../../models/employee';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import {
  source,
  sourceSelectReqDto,
  sourceSelectResDto,
} from '../../models/source';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { ImportsourceService } from '../../services/importsource.service';
import { InvoiceService } from '../../services/invoice.service';
import { ReferencelistService } from '../../services/referencelist.service';
import { ImportsourceComponent } from '../importsource/importsource.component';

@Component({
  selector: 'main-sourcelist',
  templateUrl: './sourcelist.component.html',
  styleUrls: ['./sourcelist.component.scss'],
})
export class SourceListComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private translate: TranslateService,
    private toaster_service: ToastrService,
    private sourcelist_service: ImportsourceService,
    private reference_service: ReferencelistService,
    private customer_service: CustomerService,
    private emp_service: EmployeeService
  ) {}
  readyToUpload: boolean = false;
  IsCustomerPresent: boolean = true;
  IsSalesmanPresent: boolean = true;
  IsRoutePresent: boolean = true;
  selectedDate: Date;

  routeList: referencelist[] = [];
  customerList: customerSelectResDto[] = [];
  empList: employee[] = [];
  source_list_angular_grid: AngularGridInstance;
  source_list_grid: any;
  source_list_grid_service: GridService;
  source_list_grid_data_view: any;
  source_list_columnDefinitions: Column[] = [];
  source_list_gridOptions: GridOption = {};
  source_list_dataset: sourceSelectResDto[] = [];
  new_source_list_dataset: sourceSelectResDto[] = [];
  selected_sources: Array<sourceSelectResDto> = [];
  source_list_grid_updated_object: any;

  /* translaton */
  editToolTip: string = this.translate.instant('GLOBAL.EDIT_TT');
  deleteToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');
  convertDealToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');

  ngOnInit(): void {
    this.prepareGrid();
    this.getData();
    this.getCustomer();
    this.getRoute();
    this.getEmp();
  }

  selectDate() {
    this.new_source_list_dataset = [];
    this.source_list_dataset.forEach((k, v) => {
      // k.importdate = moment(k.importdate).format('yyyy-MM-DD');

      const IDate = new Date(k.importdate);
      const SDate = new Date(this.selectedDate);

      if (SDate.getTime() === IDate.getTime()) {
        this.new_source_list_dataset.push(k);
      }
    });
  }
  // prepareGrid() {
  //   this.source_list_columnDefinitions = [
  //     {
  //       name: `<span><i class="fa fa-trash" style="color:#D3D3D3;cursor:pointer; justify-align: center;"
  //       title="${this.deleteToolTip}" name="${this.deleteToolTip}"></i></span>`,
  //       field: '',
  //       id: 2,
  //       formatter: this.contactDeleteButtonFormat,
  //       minWidth: 30,
  //       maxWidth: 35,
  //       onCellClick: (e, args: OnEventArgs) => {
  //         this.popupCommon('delete', args.dataContext);
  //       },
  //     },
  //     {
  //       name: '#',
  //       field: '',
  //       id: 4,
  //       formatter: function (row) {
  //         return (row + 1).toString();
  //       },
  //       width: 40,
  //     },
  //     {
  //       id: 'Beat',
  //       name: 'Route',
  //       field: 'beat',
  //       type: FieldType.string,
  //       sortable: true,
  //       formatter: this.Routename,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //     },
  //     {
  //       id: 'salesman',
  //       name: 'salesman',
  //       field: 'salesman',
  //       formatter: this.Salesman,
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
  //       formatter: this.Customername,
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
  //       type: FieldType.string,
  //       sortable: true,
  //       filterable: true,
  //       formatter: Formatters.dateEuro,

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

  //   this.source_list_gridOptions = {
  //     asyncEditorLoading: false,
  //     // autoHeight:true,
  //     autoResize: {
  //       container: '#sourcelist-grid1-container',
  //       // sidePadding: 15,
  //       calculateAvailableSizeBy: 'container',
  //     },
  //     // enableTranslate: true,
  //     // i18n: this.translate as any,

  //     enableExcelExport: true,
  //     registerExternalResources: [new ExcelExportService()],

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

  //   // fill the dataset with your data
  //   this.source_list_dataset = [];
  // }

  prepareGrid() {
    this.source_list_columnDefinitions = [
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
        minWidth: 40,
      },
      {
        id: 'customerid',
        name: 'CustomerID',
        field: 'customerid',
        type: FieldType.string,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'customer',
        name: 'Customer',
        field: 'customer',
        type: FieldType.string,
        formatter: this.Customername,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'beat',
        name: 'Beat',
        field: 'beat',
        type: FieldType.string,
        formatter: this.Routename,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'salesman',
        name: 'Salesman',
        field: 'salesman',
        type: FieldType.string,
        formatter: this.Salesman,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'InvoiceID',
        name: 'InvoiceID',
        field: 'invoiceid',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'docref',
        name: 'Doc Ref',
        field: 'docref',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'date',
        name: 'Date',
        field: 'invoicedate',
        type: FieldType.date,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: Formatters.dateEuro,
      },
      {
        id: 'paymentdate',
        name: 'Payment Date',
        field: 'paymentdate',
        type: FieldType.date,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: Formatters.dateEuro,
      },
      {
        id: 'paymentmode',
        name: 'Payment Mode ',
        field: 'paymentmode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'creditterm',
        name: 'Credit Term',
        field: 'creditterm',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'alternatecustomername',
        name: 'AlternateCustomerName',
        field: 'alternatecustomername',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'forumcode',
        name: 'Forum Code',
        field: 'forumcode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'goodsvalue',
        name: 'Goods Value',
        field: 'goodsvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'productdiscount',
        name: 'Product Discount',
        field: 'productdiscount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'tradediscountt',
        name: 'Trade Discount%',
        field: 'tradedispercentage',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'tradediscount',
        name: 'Trade Discount',
        field: 'tradedis',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'addldiscountt',
        name: 'Addl Discount%',
        field: 'addldispercentage',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'addldiscount',
        name: 'Addl Discount',
        field: 'addldiscount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'freight',
        name: 'Freight',
        field: 'freight',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'netvalue',
        name: 'Net Value',
        field: 'netvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'netvolume',
        name: 'Net Volume',
        field: 'netvolume',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'AdjRef',
        name: 'Adj Ref',
        field: 'AdjRef',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'adjustedamount',
        name: 'Adjusted Amount',
        field: 'adjustedamount',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'balance',
        name: 'Balance',
        field: 'balance',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'collectedamount',
        name: 'Collected Amount',
        field: 'collectedamount',
        type: FieldType.integer,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'branch',
        name: 'Branch',
        field: 'branch',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },

      {
        id: 'reference',
        name: 'Reference',
        field: 'reference',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'roundoff',
        name: 'Round Off',
        field: 'roundoff',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'documenttype',
        name: 'Document Type',
        field: 'documenttype',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'TotalTaxSufferedValue',
        name: 'Total TaxSuffered Value',
        field: 'totaltaxsufferedvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'TotalSalesTaxValue',
        name: 'totalsalestaxvalue',
        field: 'Total SalesTax Value',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'gstinofoutlet',
        name: 'GSTIN OF Outlet',
        field: 'gstinofoutlet',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'outletstatecode',
        name: 'OutletStateCode',
        field: 'outletstatecode',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'tcsrate',
        name: 'TCS Rate',
        field: 'tcsrate',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'tcsamount',
        name: 'TCS Amount',
        field: 'tcsamount',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'itemcode',
        name: 'Item Code',
        field: 'itemcode',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'itemname',
        name: 'Item Name',
        field: 'itemname',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'batch',
        name: 'Batch',
        field: 'batch',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'quantity',
        name: 'Quantity',
        field: 'quantity',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'volume',
        name: 'Volume',
        field: 'Volume',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'salesprice',
        name: 'Sales Price',
        field: 'salesprice',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'invoiceuom',
        name: 'Invoice UOM',
        field: 'invoiceuom',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'invoiceqty',
        name: 'Invoice Qty',
        field: 'invoiceqty',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'saletax',
        name: 'Sale Tax',
        field: 'saletax',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'taxsuffered',
        name: 'Tax Suffered',
        field: 'taxsuffered',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'discount',
        name: 'Discount',
        field: 'discount',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'stcredit',
        name: 'STCredit',
        field: 'stcredit',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'total',
        name: 'Total',
        field: 'total',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'TaxSufferedValue',
        name: 'Tax Suffered Value',
        field: 'taxsufferedvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'salestaxvalue',
        name: 'Sales Tax Value',
        field: 'salestaxvalue',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
      {
        id: 'hsnnumber',
        name: 'HSN Number',
        field: 'hsnnumber',
        type: FieldType.string,
        sortable: true,
        filterable: true,

        minWidth: 150,
      },
    ];
    // this.source_list_columnDefinitions = [

    //   {
    //     id: 'InvoiceID',
    //     name: 'InvoiceID',
    //     field: 'invoiceid',
    //     type: FieldType.string,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },
    //   {
    //     id: 'docref',
    //     name: 'Doc Ref',
    //     field: 'docref',
    //     type: FieldType.string,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },
    //   {
    //     id: 'date',
    //     name: 'Date',
    //     field: 'invoicedate',
    //     type: FieldType.date,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },
    //   {
    //     id: 'paymentmode',
    //     name: 'Payment Mode ',
    //     field: 'paymentmode',
    //     type: FieldType.string,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },
    //   {
    //     id: 'paymentdate',
    //     name: 'Payment Date',
    //     field: 'paymentdate',
    //     type: FieldType.date,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },
    //   {
    //     id: 'creditterm',
    //     name: 'Credit Term',
    //     field: 'creditterm',
    //     type: FieldType.string,
    //     sortable: true,
    //     filterable: true,
    //
    //     minWidth: 150,
    //   },

    // ];

    this.source_list_gridOptions = {
      asyncEditorLoading: false,

      // autoHeight:true,
      autoResize: {
        container: '#sourcelist-grid1-container',
        // sidePadding: 15,
        calculateAvailableSizeBy: 'container',
      },
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
    this.source_list_dataset = [];
  }

  async getRoute() {
    try {
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'ROUTE';
      var resp = await this.reference_service.select(req);
      if (resp) {
        this.routeList = resp;
      }
    } catch (error: any) {}
  }

  async getCustomer() {
    try {
      var req: customerSelectResDto = new customerSelectResDto();
      var resp = await this.customer_service.selectSummary(req);
      if (resp) {
        this.customerList = resp;
      }
    } catch (error: any) {}
  }
  async getEmp() {
    try {
      var req: employeeSelectResDto = new employeeSelectResDto();
      var resp = await this.emp_service.select(req);
      if (resp) {
        this.empList = resp;
      }
    } catch (error: any) {}
  }

  async getData() {
    try {
      var resp = await this.sourcelist_service.select(new sourceSelectReqDto());

      this.source_list_dataset = resp;
    } catch (error) {}
  }

  async popupCommon(e: any, args: employee) {
    var text = '';
    if (e == 'delete') {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.sourcelist_service.delete(args);
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
      this.router.navigate(['home/employeemerge'], navigation_extras);
    }
  }

  contactDeleteButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    return `<i style="color:red;  right"; aria-hidden="true"></i>`;
  };

  Customername: Formatter = (row, cell, value, columnDef, dataContext) => {
    var isPresentCustomer: boolean = false;
    if (dataContext.customer != null) {
      this.customerList.find((k, v) => {
        isPresentCustomer = dataContext.customerid == k.code ? true : false;
        if (isPresentCustomer) {
          dataContext.storeid = k.id;
        }
        return isPresentCustomer;
      });

      if (isPresentCustomer) {
        return (
          "<span style='color:green;font-weight:bold;'>" +
          dataContext.customer +
          '</span>'
        );
      }
    }
    this.IsCustomerPresent = false;

    return "<span style='color:red;'>" + dataContext.customer + '</span>';
  };

  Routename: Formatter = (row, cell, value, columnDef, dataContext) => {
    var isPresentRoute: boolean = false;

    if (dataContext.beat != null) {
      this.routeList.find((k, v) => {
        let beatValue = dataContext.beat.split(' ').join('_').toUpperCase();

        isPresentRoute = beatValue == k.code ? true : false;
        if (isPresentRoute) {
          dataContext.routeid = k.id;
        }
        return isPresentRoute;
      });
      if (isPresentRoute) {
        return (
          "<span style='color:green;font-weight:bold;'>" +
          dataContext.beat +
          '</span>'
        );
      }
    }
    this.IsRoutePresent = false;

    return "<span style='color:red;'>" + dataContext.beat + '</span>';
  };
  Salesman: Formatter = (row, cell, value, columnDef, dataContext) => {
    var isPresentSalesman: boolean = false;

    if (dataContext.salesman != null) {
      this.empList.find((k, v) => {
        isPresentSalesman = dataContext.salesman == k.name ? true : false;
        if (isPresentSalesman) {
          dataContext.empid = k.id;
        }
        return isPresentSalesman;
      });
      if (isPresentSalesman) {
        return (
          "<span style='color:green;font-weight:bold;'>" +
          dataContext.salesman +
          '</span>'
        );
      }
    }
    this.IsSalesmanPresent = false;

    return "<span style='color:red;'>" + dataContext.salesman + '</span>';
  };

  goToImportSource() {
    this.router.navigate(['home/importsource']);
  }

  handleSelectedRowsChanged = (event: any) => {
    this.selected_sources = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.source_list_dataset[v1] != undefined) {
        this.selected_sources.push(this.source_list_dataset[v1]);
      }
    });

    if (
      // this.IsCustomerPresent &&
      // this.IsRoutePresent &&
      // this.IsSalesmanPresent &&
      this.selected_sources.length > 0
    ) {
      this.readyToUpload = true;
    }
  };

  async onContactListGridCellChanged(e: any, args: any) {
    this.source_list_grid_updated_object = args.item;
  }
  contactListGridReady(angularGrid: AngularGridInstance) {
    this.source_list_angular_grid = angularGrid;
    this.source_list_grid_data_view = angularGrid.dataView;
    this.source_list_grid = angularGrid.slickGrid;
    this.source_list_grid_service = angularGrid.gridService;
  }

  async onBulkDelete() {
    try {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.sourcelist_service.deleteBulk(
            this.selected_sources
          );
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('EMPLOYEE.DELETE_SUCCESS')
            );
            this.source_list_grid.setSelectedRows([]);
            this.selected_sources = [];
            this.getData();
          }
        } catch (error) {
          this.toaster_service.error(
            this.translate.instant('EMPLOYEE.DELETE_FAILURE')
          );
        }
      } else {
        this.source_list_grid.setSelectedRows([]);
      }
    } catch (error) {}
  }

  async UploadInvoice() {
    try {
      var req: sourceSelectResDto[] = [];
      req = this.selected_sources;

      var res = await this.sourcelist_service.UploadBulkInvoice(req);
      if (res) {
        this.router.navigate(['home/invoice']);
      }
    } catch (error) {}
  }
}

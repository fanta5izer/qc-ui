import { Component, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatter,
  GridOption,
  GridService,
  OnEventArgs,
} from 'angular-slickgrid';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { billSelectResDto } from '../../models/bill';
import {
  customerSelectReqDto,
  customerSelectResDto,
} from '../../models/customer';
import {
  empcollection,
  empcollectionSelectReqDto,
  empcollectionSelectResDto,
} from '../../models/empcollection';
import { paymentbill } from '../../models/paymentbills';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { CustomerService } from '../../services/customer.service';
import { EmpcollectionService } from '../../services/empcollection.service';
import { InvoiceService } from '../../services/invoice.service';
import { ReferencelistService } from '../../services/referencelist.service';
import {
  payment,
  paymentAndPaymentBillUpdateReqDto,
} from '../../models/payment';
import { BillService } from '../../services/bill.service';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoicecollection',
  templateUrl: './invoicecollection.component.html',
  styleUrls: ['./invoicecollection.component.scss'],
})
export class InvoicecollectionComponent implements OnInit {
  constructor(
    private empCollectionService: EmpcollectionService,
    private invoice_service: InvoiceService,
    private toastrService: ToastrService,
    private referenceListService: ReferencelistService,
    private customerService: CustomerService,
    private billService: BillService,
    public calender: NgbCalendar,
    public modalService: NgbModal
  ) {}

  /** store collection grid */
  storeGrid: AngularGridInstance;
  storeGridService: GridService;
  storeGridDataView: any;
  storeGridColumnDefinitions: Column[] = [];
  storeGridOptions: GridOption = {};
  storeGridDataset: empcollectionSelectResDto[] = [];
  storedataset_filter: empcollectionSelectResDto[] = [];
  /** */
  /** invoice grid */
  invoiceGrid!: AngularGridInstance;
  invoiceGridService: GridService;
  invoiceGridDataView: any;
  invoiceGridColumnDefinitions: Column[] = [];
  invoiceGridOptions: GridOption = {};
  invoiceGridDataset: billSelectResDto[] = [];

  // bill calculation purpose
  invoiceGridDatasetCopy: billSelectResDto[] = [];
  /** */
  routeList: referencelist[] = [];
  storeCollection: empcollection = new empcollection();
  updatedInvoices: paymentbill[] = [];
  storeCollectionDate: Date = new Date();
  selectedRoute: string | any = '';
  selectedCustomer: string | any = '';
  customerList: customerSelectResDto[] = [];
  empCollectionReq: empcollectionSelectReqDto = new empcollectionSelectReqDto();
  //
  collectedAmount: number = 0;
  SelectedRows: boolean = false;
  selectedInvoiceRows: billSelectResDto[] | any = [];
  selectedCollection: empcollection = new empcollection();
  invoiceBillCalculationResult: billSelectResDto[] = [];

  ngOnInit(): void {
    this.empCollectionReq.paidon = moment(new Date()).format('yyyy-MM-DD');
    //
    this.getRouteList();
    this.getCustomerList();
    let req: empcollectionSelectReqDto = new empcollectionSelectReqDto();
    req.paidon = new Date();
    this.getStoreCollection(req);
    // this.getInvoiceList();
    this.prepareStoreGrid();
    this.prepareInvoiceGrid();
  }

  async getRouteList() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'ROUTE';
      res = await this.referenceListService.select(req);
      if (res) {
        this.routeList = res;
      }
    } catch (error) {}
  }
  async getCustomerList() {
    try {
      var req: customerSelectReqDto = new customerSelectReqDto();
      var res: customerSelectResDto[] = [];
      res = await this.customerService.select(req);
      if (res) {
        this.customerList = res;
      }
    } catch (error) {}
  }

  async getStoreCollection(req = new empcollectionSelectReqDto()) {
    try {
      let resp = await this.empCollectionService.GetEmployeeCollections(req);

      if (resp) {
        this.storeGridDataset = resp;
        this.selectedCustomer = null;
        this.selectedRoute = null;
      }
    } catch (error) {}
  }

  async getInvoiceList(req = new billSelectResDto()) {
    try {
      var resp: Array<billSelectResDto> = await this.invoice_service.select(
        req
      );
      this.invoiceGridDataset = resp;
      this.invoiceGridDatasetCopy = resp;
    } catch (error) {
      throw error;
    }
  }

  prepareStoreGrid() {
    this.storeGridColumnDefinitions = [
      {
        name: '#',
        field: '',
        id: 1,
        formatter: function (row) {
          return (row + 1).toString();
        },
        maxWidth: 40,
      },
      {
        name: '',
        field: '',
        id: 2,
        formatter: function (row) {
          return `<span class="text-success fa fa-random cursor-pointer"></span>`;
        },
        maxWidth: 30,
        onCellClick: (e, args: OnEventArgs) => {
          this.getInvoiceAganistStore(args.dataContext);
        },
      },
      // {
      //   id: 'route',
      //   name: 'Route',
      //   field: 'routename',
      //   type: FieldType.string,
      //   sortable: true,
      //   filterable: true,
      //   filter: { model: Filters.compoundInput },
      // },
      // {
      //   id: 'store',
      //   name: 'Store',
      //   field: 'customername', //  salesmanname Employee Name
      //   type: FieldType.string,
      //   sortable: true,
      //   filterable: true,
      //   filter: { model: Filters.compoundInput },
      // },
      {
        id: 'salesmanname',
        name: 'Employee Name',
        field: 'salesmanname',
        type: FieldType.string,
        sortable: true,
        filterable: true,
      },
      {
        id: 'amount',
        name: 'Amount',
        field: 'amount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        formatter: this.AmountFormatter,
      },
      // {
      //   id: 'paidon',
      //   name: 'Paid On',
      //   field: 'paidon',
      //   type: FieldType.date,
      //   sortable: true,
      //   // filterable: true,
      //   filter: { model: Filters.compoundInput },
      //   formatter: (row, cell, value, columnDef, dataContext) => {
      //     return value != null ? moment(value).format('DD-MM-yy') : '';
      //   },
      // },
    ];

    this.storeGridOptions = {
      asyncEditorLoading: false,
      autoResize: {
        container: '#store-grid-container',
        calculateAvailableSizeBy: 'container',
      },
      enableExcelExport: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableFiltering: true,
      enableAutoTooltip: true,
    };

    this.storeGridDataset = [];
  }
  invoiceGridReady(angularGrid: AngularGridInstance) {
    this.invoiceGrid = angularGrid;
  }
  AmountFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return `<div class='fw-bold text-end'>₹&nbsp;${value}</div>`;
  };
  prepareInvoiceGrid() {
    this.invoiceGridColumnDefinitions = [
      {
        name: '#',
        field: '',
        id: 4,
        formatter: function (row) {
          return (row + 1).toString();
        },
        maxWidth: 40,
      },
      {
        id: 'invoicedate',
        name: 'Invoice Date',
        field: 'billdate',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        formatter: (row, cell, value, columnDef, dataContext) => {
          return value != null ? moment(value).format('DD-MM-yy hh:mm') : '';
        },
      },
      {
        id: 'invoiceno',
        name: 'Invoice Number',
        field: 'billno',
        type: FieldType.string,
        sortable: true,
        filterable: true,
      },
      {
        id: 'amount',
        name: 'Amount',
        field: 'amount',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        formatter: this.AmountFormatter,
      },
      {
        id: 'collectedamount',
        name: 'Collected Amount',
        field: 'receivable',
        type: FieldType.number,
        sortable: true,
        filterable: true,
        formatter: (row, cell, value, columnDef, dataContext) => {
          let result = '';
          if (value) {
            result = `<div class='text-success fw-bold text-end'>₹&nbsp;${value}</div>`;
          } else {
            result = '';
          }
          return result;
        },
      },
    ];

    this.invoiceGridOptions = {
      asyncEditorLoading: false,
      autoResize: {
        container: '#invoice-grid-container',
        calculateAvailableSizeBy: 'container',
      },
      enableExcelExport: true,
      enableColumnPicker: true,
      enableFiltering: true,
      enableAutoTooltip: true,
      enableCellNavigation: true,
      editable: true,
      enableCheckboxSelector: true,
      multiSelect: true,
      rowSelectionOptions: {
        selectActiveRow: false,
      },
    };
  }

  storeFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return `<i class="fa fa-inr style="color:#036BC0;cursor:pointer;justify-align: center;"
       name="tooltip" aria-hidden="true"></i>`;
  };

  getStoreCollectionData() {
    let data = new empcollectionSelectReqDto();
    data.paidon = this.empCollectionReq.paidon;
    this.getStoreCollection(this.empCollectionReq);
  }

  getInvoiceAganistStore(args: empcollection) {
    this.selectedCollection = args;
    let request = new billSelectResDto();
    request.customerid = args.customerid;
    request.billdate = args.paidon;
    this.collectedAmount = args.amount;
    this.getInvoiceList(request);
  }

  async updateInvoice() {
    try {
      let request = _.filter(this.invoiceGridDataset, (item, key) => {
        return item.settled;
      });

      let paymentreq: payment = new payment();
      // paymentreq.id = this.selectedCollection.id;
      paymentreq.paymentinfo = this.selectedCollection.paymentinfo;
      paymentreq.amount = this.selectedCollection.amount;
      paymentreq.customerid = this.selectedCollection.customerid;
      paymentreq.receivedby = this.selectedCollection.receivedby;
      paymentreq.paidon = new Date();

      let requestPaymentBillList: Array<paymentbill> = [];
      _.forEach(request, (item) => {
        let paymentBill = new paymentbill();
        paymentBill.id = item.id;
        paymentBill.paidamount = item.receivable;
        paymentBill.billno = item.billno;
        paymentBill.billid = item.id;
        requestPaymentBillList.push(paymentBill);
      });

      let paymentUpdateRequest: paymentAndPaymentBillUpdateReqDto =
        new paymentAndPaymentBillUpdateReqDto();
      paymentUpdateRequest.payment = paymentreq;
      paymentUpdateRequest.paymentbill = requestPaymentBillList;

      let resp = await this.billService.payBill(paymentUpdateRequest);
      if (resp != null) this.toastrService.success('Updated');
      this.getStoreCollectionData();
      this.invoiceGridDataset = [];
    } catch (error) {}
  }

  empCollectionFilter(text: string) {
    if (text) {
      var storeDataset_filter = this.storeGridDataset.filter(function (item) {
        return (
          item.routename.toUpperCase().startsWith(text.toUpperCase()) ||
          item.customername.toUpperCase().startsWith(text.toUpperCase())
        );
      });
      this.storeGridDataset = storeDataset_filter;
    } else {
      this.storeGridDataset = this.storeGridDataset;
    }
  }

  onSelectedInvoiceRowsChanged(event: any) {
    this.SelectedRows = event.args.rows.length > 0;
    let selectedItems = event.args.rows;
    let invoice = this.invoiceGridDataset;

    this.selectedInvoiceRows = _.filter(invoice, (v, k) => {
      return selectedItems.includes(k);
    });
    // this.calculate();
  }

  calculate() {
    this.removeExistingInvoiceCalculation();
    if (this.selectedInvoiceRows.length > 0) {
      // custom rows selection
      this.splitCalculation(this.selectedInvoiceRows);
    } else {
      // split evently
      this.splitCalculation(this.invoiceGridDataset);
    }
  }
  removeExistingInvoiceCalculation() {
    _.forEach(this.selectedInvoiceRows, (item) => {
      item.receivable = 0;
      this.updateItem(item);
    });
  }
  splitCalculation(req: billSelectResDto[]) {
    if (req.length > 0 && this.collectedAmount > 0) {
      let balanceCollectedAmount: number = this.collectedAmount;
      let data = req;
      // this.invoiceGridDataset = [];
      this.selectedInvoiceRows = [];
      _.map(data, (item: billSelectResDto, k: number) => {
        if (balanceCollectedAmount >= item.amount) {
          balanceCollectedAmount -= item.amount;
          item.settled = true;
          item.receivable = item.amount;
          this.selectedInvoiceRows.push(item);
        } else if (balanceCollectedAmount > 0) {
          item.receivable = balanceCollectedAmount;
          item.settled = false;
          balanceCollectedAmount = 0;
          this.selectedInvoiceRows.push(item);
        }
      });
      //
      this.invoiceBillCalculationResult = this.selectedInvoiceRows;
      // this.updateSelectedRowsChanges();
    }
  }
  updateSelectedRowsChanges() {
    _.forEach(this.invoiceBillCalculationResult, (item) => {
      this.updateItem(item);
    });
  }
  updateItem(upItem: any) {
    this.invoiceGrid &&
      this.invoiceGrid.gridService &&
      this.invoiceGrid.gridService.updateItem(upItem);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Formatter,
  GridOption,
  GridService,
} from 'angular-slickgrid';
import { ToastrService } from 'ngx-toastr';
import { customer } from '../../models/customer';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';
import * as _ from 'lodash';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-importcustomer',
  templateUrl: './importcustomer.component.html',
  styleUrls: ['./importcustomer.component.scss'],
})
export class ImportcustomerComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private customerService: CustomerService,
    private referenceListService: ReferencelistService
  ) {}

  ngOnInit(): void {
    this.getRouteReference();
    this.LoadGrid();
  }

  /** slickgrid */
  importCustomer_angular_grid: AngularGridInstance;
  importCustomer_grid: any;
  importCustomer_grid_service: GridService;
  importCustomer_grid_data_view: any;
  importCustomer_columnDefinitions: Column[] = [];
  importCustomer_gridOptions: GridOption = {};
  importCustomer_dataset: customer[] = [];
  selected_source: Array<customer> = [];
  importCustomer_grid_updated_object: any;
  importCustomerSheet: string = '';
  selectedReference: Array<customer> = [];
  reference: referencelist[] = [];
  IsRoutePresent: boolean = false;
  nonExistRoute: boolean = false;

  employeeList: customer = new customer();
  ImportSourceListGridReady(angularGrid: AngularGridInstance) {
    this.importCustomer_angular_grid = angularGrid;
    this.importCustomer_grid_data_view = angularGrid.dataView;
    this.importCustomer_grid = angularGrid.slickGrid;
    this.importCustomer_grid_service = angularGrid.gridService;
  }
  handleSelectedRowsChanged = (event: any) => {
    this.selectedReference = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.importCustomer_dataset[v1] != undefined) {
        this.selectedReference.push(this.importCustomer_dataset[v1]);
      }
    });
  };

  async onImportSourceListGridCellChanged(e: any, args: any) {
    this.importCustomer_grid_updated_object = args.item;
  }

  LoadGrid() {
    this.importCustomer_columnDefinitions = [
      {
        id: 'no',
        name: '#',
        field: 'id',
        type: FieldType.number,
        maxWidth: 60,
      },
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'code',
        name: 'code',
        field: 'code',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'mobileno',
        name: 'Mobile Number',
        field: 'mobileno',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'route',
        name: 'Route',
        field: 'route',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: this.routeValidatorFormatter,
      },
      {
        id: 'address',
        name: 'Address',
        field: 'address',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'city',
        name: 'City',
        field: 'city',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: this.cityValidatorFormatter,
      },
      {
        id: 'state',
        name: 'State',
        field: 'state',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: this.stateValidatorFormatter,
      },
      {
        id: 'pincode',
        name: 'Pincode',
        field: 'pincode',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
    ];

    this.importCustomer_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#customer-container',
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

  async getRouteReference() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      // req.type = 'ROUTE';
      res = await this.referenceListService.select(req);
      if (res) {
        this.reference = res;
      }
    } catch (error) {}
  }
  onFileChange(e: any) {
    let workBook: any = null;
    let json_data = null;
    const reader = new FileReader();
    const file = e.target.files[0];
    this.importCustomerSheet = e.target.files[0].name;
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
        var _temp_import_list: customer[] = [];
        _.forEach(contact_list_import_, (v, k) => {
          let _temp = new customer();
          _temp.name = v['Name'] != null ? v['Name'].toString() : '';
          _temp.code =
            v['Name'] != null
              ? v['Name'].toString().split(' ').join('_').toUpperCase()
              : '';
          _temp.mobileno =
            v['Mobile Number'] != null ? v['Mobile Number'].toString() : '';
          _temp.route = v['Route'] != null ? v['Route'].toString() : '';
          _temp.address = v['Address'] != null ? v['Address'].toString() : '';
          _temp.city = v['City'] != null ? v['City'].toString() : '';
          _temp.state = v['State'] != null ? v['State'].toString() : '';
          _temp.pincode = v['Pincode'] != null ? v['Pincode'].toString() : '';
          _temp.id = ++k;

          v.id = ++k;
          _temp_import_list.push(_temp);
        });
        // let datacustomer = _temp_import_list;
        _.forEach(_temp_import_list, (customerItem, key) => {
          _.forEach(this.reference, (refItem, k) => {
            let item = customerItem.route.toUpperCase();
            if (item == refItem.code && refItem.code == 'ROUTE') {
              _temp_import_list[key].routeid = refItem.id;
            }
            if (item == refItem.code && refItem.code == 'CITY') {
              _temp_import_list[key].cityid = refItem.id;
            }
            if (item == refItem.code && refItem.code == 'STATE') {
              _temp_import_list[key].stateid = refItem.id;
            }
            if (item == refItem.code && refItem.code == 'DISTRICT') {
              _temp_import_list[key].districtid = refItem.id;
            }
          });
        });
        this.importCustomer_dataset = _temp_import_list;
        contact_list_import_.forEach((v1, k: any) => {
          this.selected_source.push(k);
        });
        this.importCustomer_grid.setSelectedRows(this.selected_source);
      });
    };
    reader.readAsBinaryString(file);
  }

  onClickReset() {
    this.importCustomerSheet = '';
    this.selected_source = [];
    this.importCustomer_dataset = [];
  }

  async importCustomer() {
    try {
      let request = this.importCustomer_dataset;
      let resp = await this.customerService.ImportBulkCustomer(request);
      if (resp != null) {
        this.toastrService.success('successfully updated');
        this.router.navigate(['home/referencelist']);
      }
    } catch (error) {
      throw error;
    }
  }
  routeValidatorFormatter: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    var isPresentRoute: boolean = false;
    let result = '';
    if (value != null) {
      this.reference.find((item, v) => {
        let _value = value.split(' ').join('').toUpperCase();
        isPresentRoute = _value == item.code ? true : false;
        if (isPresentRoute) {
          dataContext.routeid = item.id;
        }
        return isPresentRoute;
      });
      if (isPresentRoute) {
        result =
          "<span style='color:green;font-weight:bold;'>" + value + '</span>';
      } else {
        this.nonExistRoute = true;
        result = "<span style='color:red;'>" + value + '</span>';
      }
    }
    this.IsRoutePresent = true;
    return result;
  };
  cityValidatorFormatter: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    var isPresentRoute: boolean = false;
    let result = '';
    if (value != null) {
      this.reference.find((item, v) => {
        let _value = value.split(' ').join('').toUpperCase();
        isPresentRoute = _value == item.code ? true : false;
        if (isPresentRoute) {
          dataContext.cityid = item.id;
        }
        return isPresentRoute;
      });
      if (isPresentRoute) {
        result =
          "<span style='color:green;font-weight:bold;'>" + value + '</span>';
      } else {
        this.nonExistRoute = true;
        result = "<span style='color:red;'>" + value + '</span>';
      }
    }
    this.IsRoutePresent = true;
    return result;
  };
  stateValidatorFormatter: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    var isPresentRoute: boolean = false;
    let result = '';
    if (value != null) {
      this.reference.find((item, v) => {
        let _value = value.split(' ').join('').toUpperCase();
        isPresentRoute = _value == item.code ? true : false;
        if (isPresentRoute) {
          dataContext.stateid = item.id;
        }
        return isPresentRoute;
      });
      if (isPresentRoute) {
        result =
          "<span style='color:green;font-weight:bold;'>" + value + '</span>';
      } else {
        this.nonExistRoute = true;
        result = "<span style='color:red;'>" + value + '</span>';
      }
    }
    this.IsRoutePresent = true;
    return result;
  };
}

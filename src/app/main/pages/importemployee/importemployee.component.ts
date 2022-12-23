import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Formatter,
  GridOption,
  GridService,
} from 'angular-slickgrid';
import { employee, employeeSelectResDto } from '../../models/employee';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';

@Component({
  selector: 'app-importemployee',
  templateUrl: './importemployee.component.html',
  styleUrls: ['./importemployee.component.scss'],
})
export class ImportemployeeComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private employeeService: EmployeeService,
    private referenceListService: ReferencelistService
  ) {}

  ngOnInit(): void {
    this.getRouteReference();
    this.LoadGrid();
  }

  /** slickgrid */
  importEmployee_angular_grid: AngularGridInstance;
  importEmployee_grid: any;
  importEmployee_grid_service: GridService;
  importEmployee_grid_data_view: any;
  importEmployee_columnDefinitions: Column[] = [];
  importEmployee_gridOptions: GridOption = {};
  importEmployee_dataset: employeeSelectResDto[] = [];
  selected_source: Array<employee> = [];
  importEmployee_grid_updated_object: any;
  importEmployeeSheet: string = '';
  selectedReference: Array<employee> = [];
  routeReference: referencelist[] = [];
  IsRoutePresent: boolean = false;
  nonExistRoute: boolean = false;

  employeeList: employee = new employee();
  ImportSourceListGridReady(angularGrid: AngularGridInstance) {
    this.importEmployee_angular_grid = angularGrid;
    this.importEmployee_grid_data_view = angularGrid.dataView;
    this.importEmployee_grid = angularGrid.slickGrid;
    this.importEmployee_grid_service = angularGrid.gridService;
  }
  handleSelectedRowsChanged = (event: any) => {
    this.selectedReference = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.importEmployee_dataset[v1] != undefined) {
        this.selectedReference.push(this.importEmployee_dataset[v1]);
      }
    });
  };

  async onImportSourceListGridCellChanged(e: any, args: any) {
    this.importEmployee_grid_updated_object = args.item;
  }

  LoadGrid() {
    this.importEmployee_columnDefinitions = [
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
        id: 'mobile',
        name: 'Mobile Number',
        field: 'mobileno',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'dob',
        name: 'DOB',
        field: 'dateofbirth',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'route',
        name: 'Route',
        field: 'routename',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: this.routeValidatorFormatter,
      },
      {
        id: 'emailid',
        name: 'Email ID',
        field: 'emailid',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'password',
        name: 'Password',
        field: 'password',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
        formatter: (row, cell, value, columnDef, dataContext) => {
          return value != null
            ? `<span><input type='password' value=${value} disabled /></span>`
            : '';
        },
      },
    ];

    this.importEmployee_gridOptions = {
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

  async getRouteReference() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'ROUTE';
      res = await this.referenceListService.select(req);
      if (res) {
        this.routeReference = res;
      }
    } catch (error) {}
  }
  onFileChange(e: any) {
    let workBook: any = null;
    let json_data = null;
    const reader = new FileReader();
    const file = e.target.files[0];
    this.importEmployeeSheet = e.target.files[0].name;
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
        var _temp_import_list: employeeSelectResDto[] = [];
        _.forEach(contact_list_import_, (v, k) => {
          let _temp = new employeeSelectResDto();
          _temp.name = v['Name'] != null ? v['Name'].toString() : '';
          _temp.code =
            v['Name'] != null
              ? v['Name'].toString().split(' ').join('_').toUpperCase()
              : '';
          _temp.routename = v['Route'] != null ? v['Route'].toString() : '';
          _temp.mobileno =
            v['Mobile Number'] != null ? v['Mobile Number'].toString() : '';
          _temp.dateofbirth = v['DOB'] != null ? v['DOB'].toString() : '';
          _temp.emailid = v['Email ID'] != null ? v['Email ID'].toString() : '';
          _temp.password =
            v['Password'] != null ? v['Password'].toString() : '';

          _temp.id = ++k;

          v.id = ++k;
          _temp.dateofbirth = new Date();
          let dob = _temp.dateofbirth;
          _temp.dateofbirth = new Date(dob);
          _temp_import_list.push(_temp);
        });
        this.importEmployee_dataset = _temp_import_list;
        contact_list_import_.forEach((v1, k: any) => {
          this.selected_source.push(k);
        });

        this.importEmployee_grid.setSelectedRows(this.selected_source);
      });
    };
    reader.readAsBinaryString(file);
  }

  onClickReset() {
    this.importEmployeeSheet = '';
    this.selected_source = [];
    this.importEmployee_dataset = [];
  }

  async importEmployee() {
    try {
      let request = this.importEmployee_dataset;
      let resp = await this.employeeService.ImportBulkEmployee(request);
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
      this.routeReference.find((item, v) => {
        let _value = value.split(' ').join('_').toUpperCase();
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
}

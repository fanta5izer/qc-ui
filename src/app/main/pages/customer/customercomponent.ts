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
import { ToastrService } from 'ngx-toastr';
import {
  customer,
  customerSelectReqDto,
  customerSelectResDto,
} from '../../models/customer';
import { employee, employeeSelectReqDto } from '../../models/employee';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'main-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private translate: TranslateService,
    private toaster_service: ToastrService,
    private customer_service: CustomerService
  ) {}

  customer_list_angular_grid: AngularGridInstance;
  customer_list_grid: any;
  customer_list_grid_service: GridService;
  customer_list_grid_data_view: any;
  customer_list_columnDefinitions: Column[] = [];
  customer_list_gridOptions: GridOption = {};
  customer_list_dataset: customerSelectResDto[] = [];
  selected_customers: Array<customer> = [];
  customer_list_grid_updated_object: any;

  /* translaton */
  editToolTip: string = this.translate.instant('GLOBAL.EDIT_TT');
  deleteToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');
  convertDealToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');

  ngOnInit(): void {
    this.prepareGrid();
    this.getData();
  }

  prepareGrid() {
    this.customer_list_columnDefinitions = [
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
        id: 'name',
        name: 'Name',
        field: 'name',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
      {
        id: 'code',
        name: 'Code',
        field: 'code',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
      {
        id: 'mobile',
        name: this.translate.instant('EMPLOYEE.MOBILE'),
        field: 'mobileno',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },

      {
        id: 'address',
        name: 'Address',
        field: 'address',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
      {
        id: 'route',
        name: 'Route',
        field: 'routename',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
      {
        id: 'Area',
        name: 'Area',
        field: 'areaname',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
      {
        id: 'category',
        name: 'Category',
        field: 'categoryname',
        type: FieldType.string,
        sortable: true,
        minWidth: 150,
        filterable: true,
      },
    ];

    this.customer_list_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#customer-grid1-container',
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
    this.customer_list_dataset = [];
  }

  async getData() {
    try {
      var resp = await this.customer_service.selectSummary(
        new customerSelectReqDto()
      );
      this.customer_list_dataset = resp;
    } catch (error) {}
  }

  async popupCommon(e: any, args: employee) {
    var text = '';
    if (e == 'delete') {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.customer_service.delete(args);
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
      this.router.navigate(['home/customermerge'], navigation_extras);
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

  goToCustomerMerge() {
    this.router.navigate(['home/customermerge']);
  }

  handleSelectedRowsChanged = (event: any) => {
    this.selected_customers = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.customer_list_dataset[v1] != undefined) {
        this.selected_customers.push(this.customer_list_dataset[v1]);
      }
    });
  };

  async onContactListGridCellChanged(e: any, args: any) {
    this.customer_list_grid_updated_object = args.item;
  }
  contactListGridReady(angularGrid: AngularGridInstance) {
    this.customer_list_angular_grid = angularGrid;
    this.customer_list_grid_data_view = angularGrid.dataView;
    this.customer_list_grid = angularGrid.slickGrid;
    this.customer_list_grid_service = angularGrid.gridService;
  }

  async onBulkDelete() {
    try {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.customer_service.deleteBulk(
            this.selected_customers
          );
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('EMPLOYEE.DELETE_SUCCESS')
            );
            this.customer_list_grid.setSelectedRows([]);
            this.selected_customers = [];
            this.getData();
          }
        } catch (error) {
          this.toaster_service.error(
            this.translate.instant('EMPLOYEE.DELETE_FAILURE')
          );
        }
      } else {
        this.customer_list_grid.setSelectedRows([]);
      }
    } catch (error) {}
  }
  goImportCustomer() {
    this.router.navigate(['home/importcustomer']);
  }
}

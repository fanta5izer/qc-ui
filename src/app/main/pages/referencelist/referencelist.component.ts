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
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';
import * as _ from 'lodash';

@Component({
  selector: 'main-referencelist',
  templateUrl: './referencelist.component.html',
  styleUrls: ['./referencelist.component.scss'],
})
export class ReferencelistComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private toaster_service: ToastrService,
    private referencelist_service: ReferencelistService
  ) {}
  refrencetype_list: Array<{ id: number; displaytext: string }> = [
    { id: 1, displaytext: 'ROUTE' },
    { id: 2, displaytext: 'ROLE' },
    { id: 3, displaytext: 'DEPARTMENT' },
    { id: 4, displaytext: 'PRODUCTGROUP' },
    { id: 5, displaytext: 'CITY' },
    { id: 6, displaytext: 'DISTRICT' },
    { id: 7, displaytext: 'AREA' },
    { id: 8, displaytext: 'COUNTRY' },
    { id: 9, displaytext: 'CATEGORY' },
    { id: 10, displaytext: 'DAY' },
    { id: 11, displaytext: 'STATE' },
    { id: 12, displaytext: 'PAYMENTMODE' },
  ];

  referencelist: referencelist = new referencelist();

  referencelist_angular_grid: AngularGridInstance;
  referencelist_grid: any;
  referencelist_grid_service: GridService;
  referencelist_grid_data_view: any;
  referencelist_columnDefinitions: Column[] = [];
  referencelist_gridOptions: GridOption = {};
  referencelist_dataset: referencelist[] = [];
  selected_employees: Array<referencelist> = [];
  referencelist_grid_updated_object: any;

  /* translaton */
  editToolTip: string = this.translate.instant('GLOBAL.EDIT_TT');
  deleteToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');
  convertDealToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');

  ngOnInit(): void {
    this.prepareGrid();
    this.getData();
  }

  prepareGrid() {
    this.referencelist_columnDefinitions = [
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
        id: 'value',
        name: 'Name',
        field: 'name',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
      },
      {
        id: 'code',
        name: 'Code',
        field: 'code',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
      },
      {
        id: 'type',
        name: 'Type',
        field: 'type',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
      },
    ];

    this.referencelist_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#referencelist-grid1-container',
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
    this.referencelist_dataset = [];
  }

  async getData() {
    try {
      var resp = await this.referencelist_service.select(
        new referencelistSelectReqDto()
      );
      this.referencelist_dataset = resp;
    } catch (error) {}
  }

  async popupCommon(e: any, args: referencelist) {
    var text = '';
    if (e == 'delete') {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.referencelist_service.delete(args);
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
      this.router.navigate(['home/referencelistmerge'], navigation_extras);
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

  goToreferencelistMerge() {
    let navigation_extras: NavigationExtras = {
      // relativeTo:this.route,
      queryParams: {
        type: this.referencelist.type,
      },
    };
    this.router.navigate(['home/referencelistmerge'], navigation_extras);
  }

  async searchType() {
    try {
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = this.referencelist.type;
      var resp = await this.referencelist_service.select(req);
      this.referencelist_dataset = resp;
    } catch (error) {}
  }
  handleSelectedRowsChanged = (event: any) => {
    this.selected_employees = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.referencelist_dataset[v1] != undefined) {
        this.selected_employees.push(this.referencelist_dataset[v1]);
      }
    });
  };

  async onContactListGridCellChanged(e: any, args: any) {
    this.referencelist_grid_updated_object = args.item;
  }
  contactListGridReady(angularGrid: AngularGridInstance) {
    this.referencelist_angular_grid = angularGrid;
    this.referencelist_grid_data_view = angularGrid.dataView;
    this.referencelist_grid = angularGrid.slickGrid;
    this.referencelist_grid_service = angularGrid.gridService;
  }

  async onBulkDelete() {
    try {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.referencelist_service.deleteBulk(
            this.selected_employees
          );
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('EMPLOYEE.DELETE_SUCCESS')
            );
            this.referencelist_grid.setSelectedRows([]);
            this.selected_employees = [];
            this.getData();
          }
        } catch (error) {
          this.toaster_service.error(
            this.translate.instant('EMPLOYEE.DELETE_FAILURE')
          );
        }
      } else {
        this.referencelist_grid.setSelectedRows([]);
      }
    } catch (error) {}
  }
  importReference() {
    this.router.navigate(['home/importreference']);
  }
}

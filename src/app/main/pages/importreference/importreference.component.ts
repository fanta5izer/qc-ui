import { Component, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  GridOption,
  GridService,
} from 'angular-slickgrid';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { referencelist } from '../../models/referencelist';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReferencelistService } from '../../services/referencelist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importreference',
  templateUrl: './importreference.component.html',
  styleUrls: ['./importreference.component.scss'],
})
export class ImportreferenceComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private referenceService: ReferencelistService,
    private router: Router
  ) {}
  /** slickgrid */
  importReferenceList_angular_grid: AngularGridInstance;
  importReferenceList_grid: any;
  importReferenceList_grid_service: GridService;
  importReferenceList_grid_data_view: any;
  importReferenceList_columnDefinitions: Column[] = [];
  importReferenceList_gridOptions: GridOption = {};
  importReferenceList_dataset: referencelist[] = [];
  selected_source: Array<referencelist> = [];
  importReferenceList_grid_updated_object: any;
  importReferenceListSheet: string = '';
  selectedReference: Array<referencelist> = [];

  referenceList: referencelist = new referencelist();

  ngOnInit(): void {
    this.LoadGrid();
  }

  refrencetypeList: Array<{ id: number; displaytext: string }> = [
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
  ];

  ImportSourceListGridReady(angularGrid: AngularGridInstance) {
    this.importReferenceList_angular_grid = angularGrid;
    this.importReferenceList_grid_data_view = angularGrid.dataView;
    this.importReferenceList_grid = angularGrid.slickGrid;
    this.importReferenceList_grid_service = angularGrid.gridService;
  }
  handleSelectedRowsChanged = (event: any) => {
    this.selected_source = [];
    var rows: Array<number> = event.detail.args.rows;
    rows.forEach((v1) => {
      if (this.importReferenceList_dataset[v1] != undefined) {
        this.selected_source.push(this.importReferenceList_dataset[v1]);
      }
    });
  };

  async onImportSourceListGridCellChanged(e: any, args: any) {
    this.importReferenceList_grid_updated_object = args.item;
  }

  LoadGrid() {
    this.importReferenceList_columnDefinitions = [
      {
        id: 'no',
        name: '#',
        field: 'id',
        type: FieldType.number,
        maxWidth: 80,
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
        name: 'Code',
        field: 'code',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
      {
        id: 'type',
        name: 'Type',
        field: 'type',
        type: FieldType.string,
        sortable: true,
        filterable: true,
        minWidth: 150,
      },
    ];

    this.importReferenceList_gridOptions = {
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

  onFileChange(e: any) {
    let workBook: any = null;
    let json_data = null;
    const reader = new FileReader();
    const file = e.target.files[0];
    this.importReferenceListSheet = e.target.files[0].name;
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
        var _temp_import_list: referencelist[] = [];
        _.forEach(contact_list_import_, (v, k) => {
          if (v['Item Code'] != 'GrandTotal:') {
            if (v['InvoiceID'] != 'GrandTotal:') {
              let _temp = new referencelist();
              _temp.name = v['Name'] != null ? v['Name'].toString() : '';
              _temp.code =
                v['Name'] != null
                  ? v['Name'].split(' ').join('').toUpperCase().toString()
                  : '';
              _temp.type =
                v['Type'] != null ? v['Type'].toString().toUpperCase() : '';
              // _temp.code =
              //   v['Name'] != null
              //     ? v['Name'].toString().split(' ').join('_').toUpperCase()
              //     : '';
              // _temp.type = this.referenceList.type;
              _temp.id = ++k;

              v.id = ++k;
              _temp_import_list.push(_temp);
            }
          }
        });
        this.importReferenceList_dataset = _temp_import_list;
        contact_list_import_.forEach((v1, k: any) => {
          this.selected_source.push(k);
        });

        this.importReferenceList_grid.setSelectedRows(this.selected_source);
      });
    };
    reader.readAsBinaryString(file);
  }

  onClickReset() {
    this.importReferenceListSheet = '';
    this.selected_source = [];
    this.importReferenceList_dataset = [];
  }

  async uploadReference() {
    try {
      let request = this.importReferenceList_dataset;
      let resp = await this.referenceService.ImportBulk(request);
      if (resp != null) {
        this.toastrService.success('successfully updated');
        this.router.navigate(['home/referencelist']);
      }
    } catch (error) {
      throw error;
    }
  }
}

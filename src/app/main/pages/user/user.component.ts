import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  Column,
  FieldType,
  Filters,
  Formatter,
  GridOption,
  OnEventArgs,
} from 'angular-slickgrid';
import { ToastrService } from 'ngx-toastr';
import { Users, UsersSelectReqDto } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'main-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user_service: UserService,
    private translate: TranslateService,
    private toaster_service: ToastrService
  ) {}

  user_list_columnDefinitions: Column[] = [];
  user_list_gridOptions: GridOption = {};
  user_list_dataset: Users[] = [];

  /* translaton */
  editToolTip: string = this.translate.instant('GLOBAL.EDIT_TT');
  deleteToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');
  convertDealToolTip: string = this.translate.instant('GLOBAL.DELETE_TT');

  ngOnInit(): void {
    this.prepareGrid();
    this.getData();
  }

  prepareGrid() {
    this.user_list_columnDefinitions = [
      {
        name: `<i class="fa fa-pencil" style="color:#D3D3D3; cursor:pointer; justify-align: center;"
         title="${this.editToolTip}" name="${this.editToolTip}" aria-hidden="true"></i>`,
        field: '',
        id: 1,
        formatter: this.userEditButtonFormat,
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
        formatter: this.userDeleteButtonFormat,
        minWidth: 30,
        maxWidth: 35,
        onCellClick: (e, args: OnEventArgs) => {
          this.popupCommon('delete', args.dataContext);
        },
      },
      // {
      //   name: `<span><i class="fa fa-user" style="color:#D3D3D3;cursor:pointer; justify-align: center;"
      //   title="${this.convertDealToolTip}" name="${this.convertDealToolTip}"></i></span>`,
      //   field: '',
      //   id: 3,
      //   formatter: this.contactConvertDealButtonFormat,
      //   minWidth: 30,
      //   maxWidth: 35,
      //   onCellClick: (e, args: OnEventArgs) => {
      //     // if (
      //     //   !args.dataContext.is_factory &&
      //     //   this.selected_user_rows.length == 0
      //     // )
      //     //   this.popupCommon('delete', args);
      //   },
      // },
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
        id: 'USERFIRSTNAME',
        name: this.translate.instant('USER.FIRSTNAME'),
        field: 'firstname',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'USERLASTNAME',
        name: this.translate.instant('USER.LASTNAME'),
        field: 'lastname',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'USERUSERNAME',
        name: this.translate.instant('USER.USERNAME'),
        field: 'username',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'USERROLE',
        name: this.translate.instant('USER.ROLE'),
        field: 'role',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'USEREMAIL',
        name: this.translate.instant('USER.EMAIL'),
        field: 'email',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'USERMOBILE',
        name: this.translate.instant('USER.MOBILE'),
        field: 'mobile',
        type: FieldType.string,
        sortable: true,
        minWidth: 200,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
    ];

    this.user_list_gridOptions = {
      asyncEditorLoading: false,
      // autoHeight:true,
      autoResize: {
        container: '#user-grid1-container',
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
      // enableCheckboxSelector: true,
      enableRowSelection: true,
    };

    // fill the dataset with your data
    this.user_list_dataset = [];
  }

  userEditButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    return `<i class="fa fa-pencil" style="color:#036BC0;cursor:pointer;justify-align: center;"
       name="tooltip" aria-hidden="true"></i>`;
  };

  userDeleteButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    var data = dataContext;
    if (data.role != 'SUPERADMIN') {
      return `<i class="fa fa-trash" style="color:red;cursor:pointer;text-align: right"; aria-hidden="true"></i>`;
    } else return '';
  };

  userConvertDealButtonFormat: Formatter = (
    row,
    cell,
    value,
    columnDef,
    dataContext
  ) => {
    return `
    <img
        src="assets/icons/converdeal.svg"
        alt="Devices"
        width="18"
        height="18"
        style="color:green;cursor:pointer;text-align: right";
      />`;
  };

  async getData() {
    try {
      var resp = await this.user_service.select(new UsersSelectReqDto());
      this.user_list_dataset = resp;
    } catch (error) {}
  }

  goToUserMerge() {
    this.router.navigate(['home/usermerge'], {});
  }

  async popupCommon(e: any, args: any) {
    var text = '';
    if (e == 'delete') {
      if (confirm('Press a button!') == true) {
        try {
          var resp = await this.user_service.delete(args);
          if (resp) {
            this.toaster_service.success(
              this.translate.instant('USER.DELETE_SUCCESS')
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
      this.router.navigate(['home/usermerge'], navigation_extras);
    }
  }
}

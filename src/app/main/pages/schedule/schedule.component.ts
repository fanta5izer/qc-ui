import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { employeeSelectResDto } from '../../models/employee';
import {
  AttributesData,
  empplan,
  empplanSelectReqDto,
  empplanSelectResDto,
} from '../../models/empplan';

import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { EmployeeService } from '../../services/employee.service';
import { EmpPlanService } from '../../services/empplan.service';
import { ReferencelistService } from '../../services/referencelist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponents } from '../../components/ng-select/ng-select.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  constructor(
    private empplan_service: EmpPlanService,
    private referencelist_service: ReferencelistService,
    private employee_service: EmployeeService,
    private translate: TranslateService,
    private toaster_service: ToastrService,
    private router: Router,
    public modalService: NgbModal
  ) {}
  day_ref: referencelist[] = [];
  route_ref: referencelist[] = [];
  employee: employeeSelectResDto[] = [];

  empplan: empplanSelectResDto[] = [];

  empp: empplan = new empplan();
  updateEmpPlan: empplan[] = [];

  ngOnInit(): void {
    this.getEmployee();
    this.getRoute();
    this.getData();
  }

  DayList = [
    {
        "id": 0,
        "type": "DAY",
        "code": "SUNDAY",
        "value": "sunday",
        
    },
    {
        "id": 1,
        "type": "DAY",
        "code": "MONDAY",
        "value": "monday",
        
    },
    {
        "id": 2,
        "type": "DAY",
        "code": "TUESDAY",
        "value": "tuesday",
       
    },
    {
        "id": 3,
        "type": "DAY",
        "code": "WEDNESDAY",
        "value": "wednesday",
       
    },
    {
        "id": 4,
        "type": "DAY",
        "code": "THURSDAY",
        "value": "thursday",
       
    },
    {
        "id": 5,
        "type": "DAY",
        "code": "FRIDAY",
        "value": "friday",
        "name": "friday",
        
    },
    {
        "id": 16,
        "type": "DAY",
        "code": "SATURDAY",
        "value": "saturday",
       
    }
];
  async getRoute() {
    try {
      var res: referencelist[] = [];
      var req: referencelistSelectReqDto = new referencelistSelectReqDto();
      req.type = 'ROUTE';
      res = await this.referencelist_service.select(req);
      if (res) {
        this.route_ref = res;
      }
    } catch (error) {}
  }
  

  async getData() {
    try {
      var res: empplanSelectResDto[] = [];
      var req: empplanSelectReqDto = new empplanSelectReqDto();
      res = await this.empplan_service.select(req);
      if (res) {
        this.empplan = res;
      }
    } catch (error) {}
  }

  async getEmployee() {
    try {
      var req = new employeeSelectResDto();
      var resp = await this.employee_service.select(req);
      if (resp) {
        this.employee = resp;
      }
    } catch (error) {}
  }

  async onRouteChange(
    value: AttributesData,
    changedPlan: empplan,
    i: number,
    planIndex: number
  ) {
    var req = value.routeidList;
    const modalRef = this.modalService.open(NgSelectComponents, { size: 'lg' });
    modalRef.componentInstance.attr = req;

    await modalRef.result
      .then((result: number[]) => {
        if (result && result.length>0) {
          let value: AttributesData[] = this.empplan[i].attributes;
          value[planIndex].routeidList = result;
          this.updateEmpPlan.push(changedPlan);
        }
      })
      .catch((error) => {});
  }
  async updatePlan() {
    var result: boolean = false;
    try {
      var req: empplan[] = [];
      req = this.updateEmpPlan;
      var resp = await this.empplan_service.updateBulk(req);

      if (resp) {
        result = resp;
      }
      this.toaster_service.success('Updated Successfully');
    } catch (error) {}
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { empplan } from '../../models/empplan';
import {
  referencelist,
  referencelistSelectReqDto,
} from '../../models/referencelist';
import { ReferencelistService } from '../../services/referencelist.service';

@Component({
  selector: 'app-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
})
export class NgSelectComponents implements OnInit {
  @Input() public attr: [];

  constructor(
    private referencelist_service: ReferencelistService,
    private activeModal: NgbActiveModal
  ) {}
  route_ref: referencelist[] = [];
  empplan = new empplan();

  ngOnInit(): void {
    this.getRoute();
  }
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

  closeModal() {
    this.activeModal.close();
  }

  goBack() {
    this.activeModal.close(this.attr);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'angular-slickgrid';
import { firstValueFrom } from 'rxjs';
import { ActionReq } from 'src/app/shared/models/actionreq.model';
import { ActionRes } from 'src/app/shared/models/actionres.model';
import { environment } from 'src/environments/environment';
import { ApplicationFiles } from '../models/applicationfiles.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.baseUrl + '/api/ApplicationFiles';
  }

  async get(req: number): Promise<File> {
    let result: any;
    try {
      let postData: ActionReq<number> = new ActionReq<number>();
      postData.item = req;
      let resp = await firstValueFrom(
        this.http.post<ActionRes<File>>(this._baseUrl + '/get', postData)
      );
    } catch (error) {
      throw error;
    }
    return result;
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this._baseUrl}/Get`);
  }
}

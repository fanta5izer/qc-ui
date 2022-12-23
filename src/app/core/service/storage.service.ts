import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonUtilService } from '../util/json-util.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  redirect_url: string = '';

  public AccessToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  constructor(private _jsonUtilService: JsonUtilService) {
    this.initAuthToken();

    // this.users();
  }

  initAuthToken() {
    var authTokenTemp = localStorage.getItem('accesstoken');
    if (authTokenTemp) {
      this.AccessToken$.next(authTokenTemp);
    }
    this.AccessToken$.subscribe((v) => {
      localStorage.setItem('accesstoken', v);
    });
  }
}

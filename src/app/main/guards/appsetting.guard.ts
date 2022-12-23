import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/core/service/storage.service';

@Injectable()
export class AppSettingsGuardService implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private location: Location,
    private storage: StorageService
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    let url =
      this.location.path() != ''
        ? this.location.path()
        : this.storage.redirect_url;

    return this.checkUrl(url);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let url: string = state.url;

    return this.checkUrl(url);
  }

  checkUrl(url: string) {
    let accessToken = localStorage.getItem('accesstoken');

    if (accessToken != null && accessToken != '') {
      this.storage.redirect_url = url;
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}

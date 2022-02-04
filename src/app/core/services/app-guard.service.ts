import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AppData } from '../routes';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly _router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (
      state.url.startsWith(`/${AppData.AppEnum.PAGES}`) &&
      !this.authService.isAuth()
    ) {      
      this._router.navigateByUrl(AppData.AppEnum.AUTH);
      return true;
    }

    if (
      state.url.startsWith(`/${AppData.AppEnum.AUTH}`)  &&
      this.authService.isAuth()
    ) {
      this._router.navigate([AppData.AppEnum.PAGES]);
      return true;
    }
    console.log(state.url);
    return true;
  }
}

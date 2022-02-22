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
import { ProfileService } from 'src/app/modules/pages/modules/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _profileService: ProfileService,
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
      !this._authService.isAuth
    ) {
      this._router.navigateByUrl(AppData.AppEnum.AUTH);
      return false;
    }

    if (
      state.url.startsWith(`/${AppData.AppEnum.AUTH}`) &&
      this._authService.isAuth
    ) {
      this._router.navigate([AppData.AppEnum.PAGES]);
      return false;
    }
    return true;
  }
}

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
export class RoleGuard implements CanActivate {
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
    if (this._profileService.get()['role'] === 'user') {
      this._router.navigateByUrl(AppData.AppEnum.PAGES);
      return false;
    }
    return true;
  }
}

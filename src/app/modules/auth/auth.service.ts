import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { AppData } from 'src/app/core/routes';
import { TokenService } from 'src/app/core/services/token.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthModels } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _baseRegistrationApiRoute = 'http://localhost:3000/users';

  public get isAuth(): boolean {
    return !!this._tokenService.get();
  }

  constructor(
    private readonly http: HttpClient,
    private readonly _router: Router,
    private readonly _tokenService: TokenService,
    private readonly _usersService: UsersService
  ) {}

  public logIn(dto: AuthModels.User.IUser): Observable<unknown> {
    return this._usersService.getUser(dto).pipe(
      tap((user: AuthModels.User.IUser) => {
        this.onSuccessAuth(user);
      })
    );
  }

  public logOut() {
    this._router.navigateByUrl(AppData.AppEnum.AUTH);
    this._tokenService.remove();
  }

  public register(formValue) {
    return this.getReg().pipe(
      map((info) => ({
        check: info.find((user) => user.email === formValue['email']),
        info,
      })),
      switchMap(({ check, info }) => {
        if (check) {
          return throwError(() => new Error('Provided email already exists!'));
        }

        return this.checkUsersExists({
          ...formValue,
          todos: [],
          id: ++info[info.length - 1].id,
        });
      })
    );
  }

  private onSuccessAuth(user: AuthModels.User.IUser) {
    const token = JSON.stringify(user);

    this._tokenService.set(token);

    this._router.navigateByUrl(AppData.AppEnum.PAGES);
  }

  private checkUsersExists(dto: AuthModels.User.IUser) {
    return this.http
      .get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute)
      .pipe(
        map((item) => {
          item.length > 0
            ? (dto.role = AppData.Roles.USER)
            : (dto.role = AppData.Roles.ROOT_ADMIN);

          return dto;
        }),
        switchMap((registered) => this.createUser(registered)),
        tap((token) => {
          this.onSuccessAuth(JSON.parse(token));
        })
      );
  }

  private createUser(dto) {
    return this.http
      .post(this._baseRegistrationApiRoute, dto)
      .pipe(map((response) => JSON.stringify(response)));
  }

  private getReg() {
    return this.http.get<AuthModels.User.IUser[]>(
      this._baseRegistrationApiRoute
    );
  }
}

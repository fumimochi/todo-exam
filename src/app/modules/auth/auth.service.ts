import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

import { AppData } from "src/app/core/routes";
import { UsersService } from "src/app/core/services/users.service";
import { AuthModels } from "./models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string = '';

    constructor(
        private readonly _router: Router,
        private readonly _usersService: UsersService
    ) {
        this.getToken();
    }
    
    public getToken() {
        this._token = window.localStorage.getItem('token');
        return this._token;
    }
    
    public isAuth(): boolean {
        return !!this._token;
    }
    
    public logIn(dto: AuthModels.User.IUser): Observable<unknown> {
    return this._usersService.getUser(dto).pipe(
        tap((user: AuthModels.User.IUser) => {
        this.onSuccessAuth(user);
        })
    );
    }
    
    public logOut() {
        this._token = null;
        this._router.navigateByUrl(AppData.AppEnum.AUTH);
        window.localStorage.removeItem('token');
    }

    private onSuccessAuth(user: AuthModels.User.IUser) {
        const token = JSON.stringify(user);

        this._token = token;
        window.localStorage.setItem('token', token);

        this._router.navigateByUrl(AppData.AppEnum.PAGES);
    }
}
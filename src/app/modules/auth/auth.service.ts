import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, switchMap, tap } from "rxjs";

import { AppData } from "src/app/core/routes";
import { TokenService } from "src/app/core/services/token.service";
import { UsersService } from "src/app/core/services/users.service";
import { AuthModels } from "./models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userFields = ['email', 'nickname', 'password', 'todos', 'id', 'role'];
    private registeredUserInfo: AuthModels.User.IUser[] = [];
    private readonly _baseRegistrationApiRoute = 'http://localhost:3000/users';
    private _token: string = '';

    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
        private readonly _tokenService: TokenService,
        private readonly _usersService: UsersService
    ) {
        this.getToken();
        this.checkToken();
        this.getReg()
            .subscribe(info => {
                this.registeredUserInfo = info;
            })
    }
    
    private getToken() {
        this._token = this._tokenService.return ();
    }

    private checkToken() {
        try {
            let checkingToken = this._tokenService.return();
            let parsedToken = JSON.parse(checkingToken);
            let keyArr = Object.keys(parsedToken);
            for(let field of this.userFields) {
                if(!keyArr.includes(field)) {
                    this._token = '';
                    window.localStorage.removeItem('token');
                }
            }
        } catch(e) {
            this._token = '';
            window.localStorage.removeItem('token');
        }
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
        this._tokenService.remove()
    }

    public onSuccessAuth(user: AuthModels.User.IUser) {
        const token = JSON.stringify(user);

        this._token = token;
        this._tokenService.set(token);

        this._router.navigateByUrl(AppData.AppEnum.PAGES);
    }

    private checkUsersExists(registered: AuthModels.User.IUser) {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute)
            .pipe(map(item => {
                item.length > 0 ? registered.role = AppData.Roles.USER : registered.role = AppData.Roles.ROOT_ADMIN;
                return registered;
            }),
            switchMap(registered => this.addRegistrator(registered)))
           
    }

    public formRegisteredUser(formValue) {
            formValue = formValue;
            formValue.todos = [];
            formValue.id = this.registeredUserInfo[this.registeredUserInfo.length-1].id + 1;
        return this.checkUsersExists(formValue)
    }

    private addRegistrator(reg) {
        return this.http.post(this._baseRegistrationApiRoute, reg)
        .pipe(map(response => JSON.stringify(response)))
    }

    public getReg() {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute);
    }
}
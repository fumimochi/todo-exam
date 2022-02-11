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
    public userFields = ['email', 'nickname', 'password', 'todos', 'id', 'role'];
    private readonly _baseRegistrationApiRoute = 'http://localhost:3000/users';
    public checkNum: number = 0;
    private _token: string = '';

    constructor(
        private readonly http: HttpClient,
        private readonly _router: Router,
        private readonly _tokenService: TokenService,
        private readonly _usersService: UsersService
    ) {
        this.getToken();
        this.checkToken();
    }
    
    public getToken() {
        this._token = this._tokenService.getToken();
    }

    public checkToken() {
        try {
            let checkingToken = this._tokenService.getToken();
            let parsedToken = JSON.parse(checkingToken);
            for(let field in parsedToken) {
                this.userFields.map(item => item == field ? this.checkNum : this.checkNum += 1)
            }
            if(this.checkNum > 0) {
                this._token = '';
                window.localStorage.removeItem('token');
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
        this._tokenService.removeToken()
    }

    public onSuccessAuth(user: AuthModels.User.IUser) {
        const token = JSON.stringify(user);

        this._token = token;
        this._tokenService.setToken(token);

        this._router.navigateByUrl(AppData.AppEnum.PAGES);
    }

    public checkUsersExists(registered: AuthModels.User.IUser) {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute)
            .pipe(map(item => {
                item.length > 0 ? registered.role = AppData.Roles.USER : registered.role = AppData.Roles.ROOT_ADMIN;
                return registered;
            }),
            switchMap(registered => this.addRegistrator(registered)))
           
    }

    public addRegistrator(reg) {
        return this.http.post(this._baseRegistrationApiRoute, reg)
        .pipe(map(response => JSON.stringify(response)))
    }

    public getReg() {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute);
    }
}
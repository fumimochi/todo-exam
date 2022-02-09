import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";

import { AppData } from "src/app/core/routes";
import { TokenService } from "src/app/core/services/token.service";
import { UsersService } from "src/app/core/services/users.service";
import { AuthModels } from "./models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
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
    }
    
    public getToken() {
        this._token = this._tokenService.getToken();
        // let parsedToken = JSON.parse(this._token);
        // this._usersService.getAllUsers()
        //     .pipe(map(user => {
        //         user ===  parsedToken ? this.checkNum += 1 : this.checkNum;
        //     }))
        //     .subscribe();
        // if(this.checkNum != 0) {
        //     return this._token;
        // }
        // else {
        //     this._token = '';
        //     window.localStorage.removeItem('token');
        //     return false;
        // }
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

    public onSuccessAuth(user: AuthModels.User.IUser) {
        const token = JSON.stringify(user);

        this._token = token;
        window.localStorage.setItem('token', token);

        this._router.navigateByUrl(AppData.AppEnum.PAGES);
    }

    public checkUsersExists(): Observable<boolean> {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute)
            .pipe(map(x => x.length > 0))
    }

    public addRegistrator(reg: AuthModels.User.IUser) {
        return this.http.post(this._baseRegistrationApiRoute, reg)
        .pipe(map(response => JSON.stringify(response)))
    }

    public getReg() {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute);
    }
}
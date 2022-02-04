import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, map, Observable } from "rxjs";
import { AppData } from "src/app/core/routes";
import { AuthModels } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private readonly _baseRegistrationApiRoute = 'http://localhost:3000/users'

    constructor(private readonly http: HttpClient) { }

    public checkUsersExists(): Observable<boolean> {
        return this.http.get<AuthModels.User.IUser[]>(this._baseRegistrationApiRoute)
            .pipe(map(x => x.length > 0))
    }   

    public addRegistrator(reg: AuthModels.User.IUser) {
        if(this.checkUsersExists().subscribe()) {
            reg.role = AppData.Roles.USER;
        } else {
            reg.role = AppData.Roles.ROOT_ADMIN;
        }
        return this.http.post(this._baseRegistrationApiRoute, reg)
            .pipe(map(response => JSON.stringify(response)));
    }
}
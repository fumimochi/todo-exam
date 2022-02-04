import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private readonly _baseUsersApiROute = 'http://localhost:3000/users';

    constructor(private readonly http: HttpClient) { }

    public getUserById(id: Number) {
        return this.http.get(`${this._baseUsersApiROute}/${id}`);
    }
}
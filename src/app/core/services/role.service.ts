import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProfileService } from "src/app/modules/pages/modules/profile/profile.service";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private readonly _baseUsersApiROute = 'http://localhost:3000/users';
    
    constructor(
        private readonly http: HttpClient,
        private readonly _profileService: ProfileService
    ) { }

    public getUserRole() {
        let role = this._profileService.getObjectFromToken();
        return role['role'];
    }
}
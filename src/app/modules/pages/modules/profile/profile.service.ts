import { Injectable } from "@angular/core";
import { TokenService } from "src/app/core/services/token.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public token = '';

    constructor(private readonly _tokenService: TokenService) { }

    public getObjectFromToken() {
        let newToken = this._tokenService.get ();
        this.token = JSON.parse(newToken);
        return this.token 
    }
}       
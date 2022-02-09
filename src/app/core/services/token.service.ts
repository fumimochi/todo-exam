import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    public token: string;

    public getToken() {
        this.token = window.localStorage.getItem('token');
        return this.token;
    }
}
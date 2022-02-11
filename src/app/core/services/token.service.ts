import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    public token: string;

    constructor() {
        this.getToken();
    }

    public getToken() {
        this.token = window.localStorage.getItem('token');
        return this.token;
    }

    public removeToken() {
        window.localStorage.removeItem('token');
    }
    
    public setToken(token) {
        window.localStorage.setItem('token', token);
    }
}
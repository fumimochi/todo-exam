import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private token: string;

    constructor() {
        this.return ();
    }

    public return () {
        this.token = window.localStorage.getItem('token');
        return this.token;
    }

    public remove() {
        window.localStorage.removeItem('token');
    }
    
    public set(token) {
        window.localStorage.setItem('token', token);
    }
}
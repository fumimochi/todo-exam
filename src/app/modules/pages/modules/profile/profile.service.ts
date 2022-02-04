import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public token = '';

    constructor() { }

    public getObjectFromToken() {
        let newToken = window.localStorage.getItem('token');
        this.token = JSON.parse(newToken);
        return this.token 
    }
}
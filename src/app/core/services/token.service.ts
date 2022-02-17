import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private userFields = ['email', 'nickname', 'password', 'todos', 'id', 'role'];
    private token: string;

    constructor() {
        this.get ();
    }

    public get() {
        this.token = window.localStorage.getItem('token');
        return this.token;
    }

    public remove() {
        window.localStorage.removeItem('token');
    }
    
    public set(token) {
        window.localStorage.setItem('token', token);
    }

    public checkToken() {
        let checkingToken = this.get();
        checkingToken = JSON.parse(checkingToken);
        let keyArr = Object.keys(checkingToken);
        for(let field of this.userFields) {
            if(!keyArr.includes(field)) {
                throw new Error();
            }
        }
    }
}
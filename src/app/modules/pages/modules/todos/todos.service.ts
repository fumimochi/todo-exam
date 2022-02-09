import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthModels } from "src/app/modules/auth/models";
import { PagesModels } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    public todo: PagesModels.Todo.ITodo;
    private readonly _baseCategoriesApiRoute = 'http://localhost:3000/categories';
    private readonly _baseUsersApiRoute = 'http://localhost:3000/users';

    constructor(private readonly http: HttpClient) { }

    public getCategories() {
        return this.http.get<PagesModels.Category.ICategories[]>(this._baseCategoriesApiRoute);
    }

    public getUserById(id: number) {
        return this.http.get<AuthModels.User.IUser> (`${this._baseUsersApiRoute}/${id}`);
    }

    public putUserWithTodo(user: AuthModels.User.IUser, id: number) {
        return this.http.put(`${this._baseUsersApiRoute}/${id}`, user);
    }

}
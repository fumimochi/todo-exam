import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagesModels } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    private readonly _baseCategoriesApiRoute = 'http://localhost:3000/categories';
    private readonly _baseTodosApiRoute = 'http://localhost:3000/todos';

    constructor(private readonly http: HttpClient) { }

    public getCategories() {
        return this.http.get<PagesModels.Category.ICategories[]>(this._baseCategoriesApiRoute);
    }

    public getTodos() {
        return this.http.get<PagesModels.Todo.ITodo[]> (this._baseTodosApiRoute);
    }

    public postTodo(todo: PagesModels.Todo.ITodo) {
        return this.http.post(this._baseTodosApiRoute, todo);
    }

    public deleteTodo(todo: PagesModels.Todo.ITodo) {
        return this.http.delete(`${this._baseTodosApiRoute}/${todo.id}`)
    }
}
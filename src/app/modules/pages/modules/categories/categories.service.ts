import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PagesModels } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private readonly _baseCategoriesApiRoute = 'http://localhost:3000/categories';

    constructor(private readonly http: HttpClient) { };

    public get(): Observable<PagesModels.Category.ICategories[]> {
        return this.http.get<PagesModels.Category.ICategories[]>(this._baseCategoriesApiRoute)
    }

    public add(cat: PagesModels.Category.ICategories) {
        return this.http.post(this._baseCategoriesApiRoute, cat)
    }   

    public delete(cat: PagesModels.Category.ICategories) {
        return this.http.delete(`${this._baseCategoriesApiRoute}/${cat.id}`)
    }

    public getExectCategory(id: number): Observable<PagesModels.Category.ICategories>{
        return this.http.get<PagesModels.Category.ICategories>(`${this._baseCategoriesApiRoute}/${id}`);
    }

    public change(cat: PagesModels.Category.ICategories, id: number) {
        return this.http.put(`${this._baseCategoriesApiRoute}/${id}`, cat);
    }
}
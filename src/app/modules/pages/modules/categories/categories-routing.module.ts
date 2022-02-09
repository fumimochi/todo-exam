import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoriesComponent } from "./categories.component";
import { IdCategoryComponent } from "./components/id-category/id-category.component";

const routes: Routes = [
    { 
        path: '', 
        component: CategoriesComponent 
    },
    {
        path: ':id',
        component: IdCategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
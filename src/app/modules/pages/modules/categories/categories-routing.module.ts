import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PagesModels } from "../../models";
import { CategoriesComponent } from "./categories.component";
import { CategoryDetailsComponent } from "./pages/categories-details-page/categories-details-page.component";
import { CategoriesListComponent } from "./pages/categories-list-page/categories-list-page.component";

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '', redirectTo: PagesModels.EntityDetailsRoutes['categories'], pathMatch: 'full'
            },
            {
                path: PagesModels.EntityDetailsRoutes['categories'],
                component: CategoriesListComponent
            },
            {
                path: `${PagesModels.EntityDetailsRoutes['categories']}/:id`,
                component: CategoryDetailsComponent
            }
        ]
    }
    
]

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
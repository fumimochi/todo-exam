import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppData } from "src/app/core/routes";

import { CategoriesComponent } from "./categories.component";
import { ChangeCategoryComponent } from "./components/id-category/change-category.component";
import { ShowCategoryComponent } from "./components/show-category/show-category.component";

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '', redirectTo: AppData.AppEnum.WATCH_CAT, pathMatch: 'full'
            },
            {
                path: AppData.AppEnum.WATCH_CAT,
                component: ShowCategoryComponent
            },
            {
                path: `${AppData.AppEnum.WATCH_CAT}/:id`,
                component: ChangeCategoryComponent
            }
        ]
    }
    
]

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
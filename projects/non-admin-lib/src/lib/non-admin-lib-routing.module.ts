import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "src/app/core/routes";
import { PagesComponent } from "src/app/modules/pages/pages.component";
import { NonAdminLibComponent } from "./non-admin-lib.component";

const routes: Routes = [
    {
        path: '',
        component: NonAdminLibComponent,
        children: [
            { path: '', redirectTo: AppData.AppEnum.PROFILE, pathMatch: 'full'},
            {
                path: AppData.AppEnum.PROFILE,
                loadChildren: () => 
                    import('../../../../src/app/modules/pages/modules/profile/profile.module').then(child => child.ProfileModule)
            },
            {
                path: AppData.AppEnum.TODOS,
                loadChildren: () => 
                    import('../../../../src/app/modules/pages/modules/todos/todos.module').then(child => child.TodosModule)
            },
            {
                path: AppData.AppEnum.CATEGORIES,
                loadChildren: () => 
                    import('../../../../src/app/modules/pages/modules/categories/categories.module').then(child => child.CategoriesModule)
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NonAdminPagesRoutingModule { }
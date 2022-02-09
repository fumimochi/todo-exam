import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "src/app/core/routes";
import { AppGuard } from "src/app/core/services/app-guard.service";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: AppData.AppEnum.PROFILE, pathMatch: 'full'},
            {
                path: AppData.AppEnum.PROFILE,
                loadChildren: () => 
                    import('./modules/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: AppData.AppEnum.TODOS,
                loadChildren: () => 
                    import('./modules/todos/todos.module').then(n => n.TodosModule)
            },
            {
                path: AppData.AppEnum.CATEGORIES,
                loadChildren: () => 
                    import('./modules/categories/categories.module').then(k => k.CategoriesModule)
            },
            {
                path: AppData.AppEnum.USERS,
                canActivate: [AppGuard],
                loadChildren: () => 
                    import('./modules/users/users.module').then(j => j.UsersModule)
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
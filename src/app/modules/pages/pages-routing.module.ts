import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "src/app/core/routes";
import { PagesComponent } from "./pages.component";
import { RoleGuard } from "src/app/core/guards/role-guard.service";

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: AppData.AppEnum.PROFILE, pathMatch: 'full'},
            {
                path: AppData.AppEnum.PROFILE,
                loadChildren: () => 
                    import('./modules/profile/profile.module').then(child => child.ProfileModule)
            },
            {
                path: AppData.AppEnum.TODOS,
                loadChildren: () => 
                    import('./modules/todos/todos.module').then(child => child.TodosModule)
            },
            {
                path: AppData.AppEnum.CATEGORIES,
                loadChildren: () => 
                    import('./modules/categories/categories.module').then(child => child.CategoriesModule)
            },
            {
                path: AppData.AppEnum.USERS,
                canActivate: [RoleGuard],
                loadChildren: () => 
                    import('./modules/users/users.module').then(child => child.UsersModule)
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "src/app/core/routes";
import { AppGuard } from "src/app/core/services/app-guard.service";
import { IdCategoryComponent } from "./modules/categories/components/id-category/id-category.component";
import { IdTodoComponent } from "./modules/todos/components/id-todo/id-todo.component";
import { IdUsersComponent } from "./modules/users/components/id-users/id-users.component";
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
                path: `${AppData.AppEnum.TODOS}/:id`,
                component: IdTodoComponent
            },
            {
                path: AppData.AppEnum.CATEGORIES,
                loadChildren: () => 
                    import('./modules/categories/categories.module').then(k => k.CategoriesModule)
            },
            {
                path: `${AppData.AppEnum.CATEGORIES}/:id`,
                component: IdCategoryComponent
            },
            {
                path: AppData.AppEnum.USERS,
                loadChildren: () => 
                    import('./modules/users/users.module').then(j => j.UsersModule)
            }, 
            {
                path: `${AppData.AppEnum.USERS}/:id`,
                component: IdUsersComponent
            }
        ],
        canActivate: [AppGuard]
    },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
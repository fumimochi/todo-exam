import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersListComponent } from "./pages/users-list-page/users-list-page.component";
import { UsersDetailsComponent } from "./pages/users-details-page/users-details-page.component";
import { UsersComponent } from "./users.component";
import { PagesModels } from "../../models";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '', redirectTo: PagesModels.EntityDetailsRoutes['users'], pathMatch: 'full'
            },
            {
                path: PagesModels.EntityDetailsRoutes['users'],
                component: UsersListComponent
            },
            {
                path: `${PagesModels.EntityDetailsRoutes['users']}/:id`,
                component: UsersDetailsComponent
            }
        ]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
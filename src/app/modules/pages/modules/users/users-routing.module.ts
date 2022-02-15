import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppData } from "src/app/core/routes";
import { DisplayUsersComponent } from "./components/display-users/display-users.component";

import { ManageUsersComponent } from "./components/manage-users/manage-users.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '', redirectTo: AppData.AppEnum.DISPLAY_USERS, pathMatch: 'full'
            },
            {
                path: `${AppData.AppEnum.DISPLAY_USERS}/:id`,
                component: ManageUsersComponent
            },
            {
                path: AppData.AppEnum.DISPLAY_USERS,
                component: DisplayUsersComponent
            }
        ]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
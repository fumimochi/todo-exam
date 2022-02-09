import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IdUsersComponent } from "./components/id-users/id-users.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    { 
        path: '', 
        component: UsersComponent,
    },
    {
        path: ':id',
        component: IdUsersComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
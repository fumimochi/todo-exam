import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { DisplayUsersComponent } from "./components/display-users/display-users.component";
import { ManageUsersComponent } from "./components/manage-users/manage-users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent,
        ManageUsersComponent,
        DisplayUsersComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
    ]
})
export class UsersModule { }
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { IdUsersComponent } from "./components/id-users/id-users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent,
        IdUsersComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
    ]
})
export class UsersModule { }
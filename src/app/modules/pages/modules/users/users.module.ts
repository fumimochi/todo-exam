import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IdUsersComponent } from "./components/id-users/id-users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent,
        IdUsersComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class UsersModule { }
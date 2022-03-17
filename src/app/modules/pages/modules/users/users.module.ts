import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { UsersListComponent } from "./pages/users-list-page/users-list-page.component";
import { UsersDetailsComponent } from "./pages/users-details-page/users-details-page.component";import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { TemplateModule } from "src/app/core/modules/template.module";

@NgModule({
    declarations: [
        UsersComponent,
        UsersDetailsComponent,
        UsersListComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
        TemplateModule
    ]
})
export class UsersModule { }
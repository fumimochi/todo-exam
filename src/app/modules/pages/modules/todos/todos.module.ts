import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { TemplateModule } from "src/app/core/modules/template.module";
import { ListCardComponent } from "../components/list-card/list-card.component";
import { TodoDetailsComponent } from "./pages/todo-details-page/todo-details-page.component";
import { TodoListComponent } from "./pages/todo-list-page/todo-list-page.component";
import { TodosRoutingModule } from "./todos-routing.module";
import { TodosComponent } from "./todos.component";

@NgModule({
    declarations: [
        TodosComponent,
        TodoDetailsComponent,
        TodoListComponent
    ],
    imports: [
        SharedModule,
        TodosRoutingModule,
        TemplateModule
    ]
})
export class TodosModule { }
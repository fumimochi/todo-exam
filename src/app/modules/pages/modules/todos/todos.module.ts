import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
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
    ]
})
export class TodosModule { }
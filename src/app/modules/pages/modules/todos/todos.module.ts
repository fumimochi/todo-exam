import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { IdTodoComponent } from "./components/id-todo/id-todo.component";
import { TodosRoutingModule } from "./todos-routing.module";
import { TodosComponent } from "./todos.component";

@NgModule({
    declarations: [
        TodosComponent,
        IdTodoComponent
    ],
    imports: [
        SharedModule,
        TodosRoutingModule,
    ]
})
export class TodosModule { }
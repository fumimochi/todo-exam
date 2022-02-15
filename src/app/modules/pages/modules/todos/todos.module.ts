import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { ChangeTodoComponent } from "./components/change-todo/change-todo.component";
import { DisplayTodoComponent } from "./components/display-todo/display-todo.component";
import { TodosRoutingModule } from "./todos-routing.module";
import { TodosComponent } from "./todos.component";

@NgModule({
    declarations: [
        TodosComponent,
        ChangeTodoComponent,
        DisplayTodoComponent
    ],
    imports: [
        SharedModule,
        TodosRoutingModule,
    ]
})
export class TodosModule { }
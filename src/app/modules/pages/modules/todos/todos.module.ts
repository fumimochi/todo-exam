import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IdTodoComponent } from "./components/id-todo/id-todo.component";
import { TodosRoutingModule } from "./todos-routing.module";

import { TodosComponent } from "./todos.component";

@NgModule({
    declarations: [
        TodosComponent,
        IdTodoComponent
    ],
    imports: [
        CommonModule,
        TodosRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TodosModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IdTodoComponent } from "./components/id-todo/id-todo.component";

import { TodosComponent } from "./todos.component";

const routes: Routes = [
    { 
        path: '', 
        component: TodosComponent 
    },
    {
        path: ':id',
        component: IdTodoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule { }
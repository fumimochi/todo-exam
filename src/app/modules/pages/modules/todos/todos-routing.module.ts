import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppData } from "src/app/core/routes";
import { ChangeTodoComponent } from "./components/change-todo/change-todo.component";
import { DisplayTodoComponent } from "./components/display-todo/display-todo.component";

import { TodosComponent } from "./todos.component";

const routes: Routes = [
    {
        path: '',
        component: TodosComponent,
        children: [
            {
                path: '', redirectTo: AppData.AppEnum.DISPLAY_TODO, pathMatch: 'full'
            },
            {
                path: `${AppData.AppEnum.DISPLAY_TODO}/:id`,
                component: ChangeTodoComponent
            },
            {
                path: AppData.AppEnum.DISPLAY_TODO,
                component: DisplayTodoComponent
            }
        ]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule { }
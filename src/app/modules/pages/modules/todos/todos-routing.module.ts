import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppData } from "src/app/core/routes";
import { PagesModels } from "../../models";
import { TodoDetailsComponent } from "./pages/todo-details-page/todo-details-page.component";
import { TodoListComponent } from "./pages/todo-list-page/todo-list-page.component";

import { TodosComponent } from "./todos.component";

const routes: Routes = [
    {
        path: '',
        component: TodosComponent,
        children: [
            {
                path: '', redirectTo: PagesModels.EntityDetailsRoutes['todo'], pathMatch: 'full'
            },
            {
                path: PagesModels.EntityDetailsRoutes['todo'],
                component: TodoListComponent
            },
            {
                path: `${PagesModels.EntityDetailsRoutes['todo']}/:id`,
                component: TodoDetailsComponent
            }
        ]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule { }
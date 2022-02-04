import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { IdCategoryComponent } from "./components/id-category/id-category.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        IdCategoryComponent
    ],
    imports: [
        CommonModule, 
        CategoriesRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CategoriesModule { }
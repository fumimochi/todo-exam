import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { IdCategoryComponent } from "./components/id-category/id-category.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        IdCategoryComponent
    ],
    imports: [
        SharedModule, 
        CategoriesRoutingModule,
    ]
})
export class CategoriesModule { }
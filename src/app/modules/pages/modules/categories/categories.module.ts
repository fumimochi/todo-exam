import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { ChangeCategoryComponent } from "./components/id-category/change-category.component";
import { ShowCategoryComponent } from "./components/show-category/show-category.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        ChangeCategoryComponent, 
        ShowCategoryComponent
    ],
    imports: [
        SharedModule, 
        CategoriesRoutingModule,
    ]
})
export class CategoriesModule { }
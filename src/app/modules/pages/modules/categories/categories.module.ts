import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryDetailsComponent } from "./pages/categories-details-page/categories-details-page.component";
import { CategoriesListComponent } from "./pages/categories-list-page/categories-list-page.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryDetailsComponent, 
        CategoriesListComponent
    ],
    imports: [
        SharedModule, 
        CategoriesRoutingModule,
    ]
})
export class CategoriesModule { }
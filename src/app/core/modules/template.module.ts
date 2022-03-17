import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ListCardComponent } from "src/app/modules/pages/modules/components/list-card/list-card.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ListCardComponent
    ],
    exports: [
        ListCardComponent
    ]
})
export class TemplateModule { }
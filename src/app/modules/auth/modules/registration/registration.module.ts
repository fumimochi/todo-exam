import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./registration.component";

@NgModule({
    declarations: [ RegistrationComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RegistrationRoutingModule
    ]
})
export class RegistrationModule { }
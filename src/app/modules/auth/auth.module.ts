import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/core/modules/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { SignInPageComponent } from "./modules/components/sign-in-page/sign-in-page.component";
import { SignUpPageComponent } from "./modules/components/sign-up-page/sign-up-page.component";

@NgModule({
    declarations: [ 
        AuthComponent, 
        SignInPageComponent,
        SignUpPageComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
    ]
})
export class AuthModule { }
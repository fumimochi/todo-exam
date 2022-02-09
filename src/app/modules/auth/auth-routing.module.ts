import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "src/app/core/routes";
import { AuthComponent } from "./auth.component";
import { SignInPageComponent } from "./modules/components/sign-in-page/sign-in-page.component";
import { SignUpPageComponent } from "./modules/components/sign-up-page/sign-up-page.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '', redirectTo: AppData.AppEnum.SIGN_IN, pathMatch: 'full'
            },
            {
                path: AppData.AppEnum.SIGN_IN,
                component: SignInPageComponent
            },
            {
                path: AppData.AppEnum.SIGN_UP,
                component: SignUpPageComponent
            }
        ]
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }  
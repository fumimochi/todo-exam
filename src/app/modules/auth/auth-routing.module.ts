import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppData } from "src/app/core/routes";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    },
    {
        path: AppData.AppEnum.REGISTRATION,
        loadChildren: () =>
            import('./modules/registration/registration.module').then(m => m.RegistrationModule),
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }  
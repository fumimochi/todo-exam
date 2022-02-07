import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "./core/routes";
import { AppGuard } from "./core/services/app-guard.service";
import { StartComponent } from "./modules/start/start.component";

const appRoutes: Routes = [
    {   
        path: '', 
        component: StartComponent
    },
    {
        path: AppData.AppEnum.PAGES,
        canActivate: [AppGuard],
        loadChildren: () =>
            import('./modules/pages/pages.module').then(n => n.PagesModule),
    },
    {
        path: AppData.AppEnum.AUTH,
        canActivate: [AppGuard],
        loadChildren: () => 
            import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppData } from "./core/routes";
import { AuthGuard } from "./core/guards/auth-guard.service";
import { RoleGuard } from "./core/guards/role-guard.service";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: AppData.AppEnum.PAGES,
        pathMatch: 'full'
    },
    {
        path: AppData.AppEnum.PAGES,
        canActivate: [RoleGuard, AuthGuard],
        loadChildren: () =>
            import('./modules/pages/pages.module').then(child => child.PagesModule),
    },
    {
        path: AppData.AppEnum.NON_ADMIN,
        canActivate: [AuthGuard],
        loadChildren: () => 
            import('../../projects/non-admin-lib/src/lib/non-admin-lib.module').then(child => child.NonAdminLibModule),
    },
    {
        path: AppData.AppEnum.AUTH,
        canActivate: [AuthGuard],
        loadChildren: () => 
            import('./modules/auth/auth.module').then(child => child.AuthModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
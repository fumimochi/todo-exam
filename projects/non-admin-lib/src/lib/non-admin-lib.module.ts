import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NonAdminPagesRoutingModule } from './non-admin-lib-routing.module';
import { NonAdminLibComponent } from './non-admin-lib.component';

@NgModule({
  declarations: [
    NonAdminLibComponent
  ],
  imports: [
    CommonModule,
    NonAdminPagesRoutingModule
  ]
})
export class NonAdminLibModule { }

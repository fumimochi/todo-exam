import { Component, OnInit } from '@angular/core';

import { AppData } from 'src/app/core/routes';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { PagesModels } from 'src/app/modules/pages/models';

@Component({
  selector: 'non-admin-lib-non-admin-lib',
  templateUrl: './non-admin-lib.component.html',
  styleUrls: ['../../../../src/app/modules/pages/pages.component.scss']
})
export class NonAdminLibComponent implements OnInit {
  public appTitle = 'ToDo Application';
  public navItems: Array<PagesModels.INav>;

  constructor(
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.navItems = [
      { title: 'Todos', route: AppData.AppEnum.TODOS},
      { title: 'Categories Management', route: AppData.AppEnum.CATEGORIES},
      { title: 'Profile', route: AppData.AppEnum.PROFILE}
    ]
  }

  public changeLoginStatus(status: string) {
    this.authService.logOut();
  }
}

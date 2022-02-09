import { Component, OnInit } from '@angular/core';
import { AppData } from 'src/app/core/routes';

import { RoleService } from 'src/app/core/services/role.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent  implements OnInit{
  public appTitle = 'ToDo Application';
  public navItems;

  constructor(
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.navItems = [
      { title: 'Todos', route: AppData.AppEnum.TODOS},
      { title: 'Categories Management', route: AppData.AppEnum.CATEGORIES},
      { title: 'Profile', route: AppData.AppEnum.PROFILE},
      { title: 'Users', route: AppData.AppEnum.USERS}
    ]
  }

  public changeLoginStatus(status: string) {
    this.authService.logOut();
  }
}

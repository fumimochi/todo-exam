import { Component, OnInit } from '@angular/core';

import { AppData } from 'src/app/core/routes';
import { AuthService } from '../auth/auth.service';
import { PagesModels } from './models';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent  implements OnInit{
  public appTitle = 'ToDo Application';
  public navItems: Array<PagesModels.INav>;
  public flagProduction = environment.production;

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

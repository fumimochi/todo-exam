import { Component, OnInit } from '@angular/core';

import { RoleService } from 'src/app/core/services/role.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent  implements OnInit {
  public appTitle = 'ToDo Application';
  public id: number; 
  public isUser: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) {}

    ngOnInit() {
      this.roleService.getUserRole() === 'user' ? this.isUser = true : this.isUser = false;
    }

  public changeLoginStatus(status: string) {
    this.authService.logOut();
  }
}

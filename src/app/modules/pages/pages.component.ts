import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent   {
  public appTitle = 'ToDo Application';
  public id: number; 

  constructor(
    private readonly authService: AuthService
  ) {}

  public changeLoginStatus(status: string) {
    this.authService.logOut();
  }

}

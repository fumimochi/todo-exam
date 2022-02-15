import { Component, OnInit } from "@angular/core";

import { UsersService } from "src/app/core/services/users.service";
import { AuthModels } from "src/app/modules/auth/models";
import { ProfileService } from "../../../profile/profile.service";

@Component({
    selector: 'app-display-todo',
    templateUrl: './display-users.component.html',
    styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit{
    public users: AuthModels.User.IUser[] = [];
    public id: number;

  constructor(
    private readonly _usersService: UsersService,
    private readonly _profileService: ProfileService
  ) { }

  ngOnInit() {
    this._usersService.getAllUsers()
      .subscribe(users => this.users = users);

   this.id = this._profileService.getObjectFromToken()['id'];
  }
 }
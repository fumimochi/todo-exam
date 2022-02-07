import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/core/services/users.service';
import { AuthModels } from 'src/app/modules/auth/models';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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

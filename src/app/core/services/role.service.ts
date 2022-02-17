import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from 'src/app/modules/pages/modules/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private readonly _profileService: ProfileService) {}

  public getUserRole() {
    let role = this._profileService.get();
    return role['role'];
  }
}

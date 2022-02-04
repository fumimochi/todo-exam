import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileInfo;

  constructor(private readonly _profileService: ProfileService) { }

  ngOnInit() {
    this.profileInfo = this._profileService.getObjectFromToken()
  }

}

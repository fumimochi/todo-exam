import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs';
import { AppData } from 'src/app/core/routes';
import { TokenService } from 'src/app/core/services/token.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from '../../../auth.service';
import { AuthModels } from '../../../models';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  public neededUser: AuthModels.User.IUser;
  public suchEmailExists: boolean = false;
  public registeredUserInfo: AuthModels.User.IUser[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _tokenService: TokenService,
    private readonly _router: Router,
  ) { };

  public readonly form = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4)
    ])
  })

  ngOnInit() {
      this._authService.getReg()
        .subscribe(info => {
          this.registeredUserInfo = info;
        })
  }

  public submitRegistration() {
    let check = this.registeredUserInfo.find(user => user.email === this.form.get('email').value);
    if(!check) {
      this.suchEmailExists = false;
      let registered = this.form.value;
      registered.todos = [];
      registered.id = this.registeredUserInfo[this.registeredUserInfo.length-1].id + 1;
      this._authService.checkUsersExists(registered)
        .subscribe(token => {
          this._tokenService.setToken(token)
          this._authService.logIn(registered);
          this._authService.onSuccessAuth(registered);
        });
        
    } else {
      this.suchEmailExists = true;
    }
    this._router.navigateByUrl(`${AppData.AppEnum.PAGES}`);
  }

}

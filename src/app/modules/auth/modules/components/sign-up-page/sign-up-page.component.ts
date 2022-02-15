import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from '../../../auth.service';
import { AuthModels } from '../../../models';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  private neededUser: AuthModels.User.IUser;
  public suchEmailExists: boolean = false;
  private registeredUserInfo: AuthModels.User.IUser[] = [];
  private registered;

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
    this.formRegisteredUser();
    if(!check) {
      this.suchEmailExists = false;
      this._authService.checkUsersExists(this.registered)
        .subscribe(token => {
          this._tokenService.set(token)
          this._authService.logIn(this.registered);
          this._authService.onSuccessAuth(this.registered);
        });
    } else {
      this.suchEmailExists = true;
    }
  }

  private formRegisteredUser() {
    this.registered = this.form.value;
    this.registered.todos = [];
    this.registered.id = this.registeredUserInfo[this.registeredUserInfo.length-1].id + 1;
  }

}

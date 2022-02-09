import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs';
import { AppData } from 'src/app/core/routes';
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
      this._authService.checkUsersExists().subscribe(exists => {
        if(exists) {
          registered.role = AppData.Roles.USER
        } else {
          registered.role = AppData.Roles.ROOT_ADMIN
        }
        registered.todos = [];
        this._authService.addRegistrator(registered)
          .subscribe(token => {
            window.localStorage.setItem('token', token);
            this._authService.onSuccessAuth(registered);
          });
      })
    } else {
      this.suchEmailExists = true;
    }
    this._router.navigateByUrl(`${AppData.AppEnum.PAGES}`);
  }

}

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
    this._authService.formRegisteredUser(this.form.value, this.registeredUserInfo)
      .subscribe(
        () => {
          console.log('SUCCESSFUL SIGNED UP!');
        },
        (error) => {
          this.suchEmailExists = true;
        }
      );
  }

}

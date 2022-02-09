import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../auth.service';
import { AuthModels } from '../../../models';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  public authFailed: boolean = false;
  public isLoading: boolean;

  constructor(private readonly _authService: AuthService) { }

  public readonly form = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  public get canLogIn(): boolean {
    return this.form.valid && !this.isLoading;
  }

  private get _dto(): AuthModels.User.IUser {
    return this.form.value;
  }

  public logIn() {
    this.isLoading = true;

    this._authService
      .logIn(this._dto)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          console.log('SUCCESSFUL LOGGED IN!');
        },
        (error) => {
          this.authFailed = true;
        }
      );
  }
}

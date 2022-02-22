import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  public suchEmailExists: boolean = false;

  constructor(private readonly _authService: AuthService) {}

  public readonly form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  public submitRegistration() {
    this._authService.register(this.form.value).subscribe({
      next: () => {
        console.log('SUCCESSFUL SIGNED UP!');
      },
      error: (error: HttpErrorResponse) => {
        if(error.message === 'Provided email already exists!') {
          console.log(error.message);
        } else {
          console.log('Some new error has occured')
        }
        this.suchEmailExists = true;
      },
    });
  }
}

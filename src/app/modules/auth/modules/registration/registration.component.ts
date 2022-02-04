import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private readonly _registrationService: RegistrationService) { };

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

  public submitRegistration() {
    this._registrationService.addRegistrator(this.form.value)
      .subscribe();
  }

}

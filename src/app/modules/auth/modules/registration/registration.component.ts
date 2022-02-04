import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModels } from '../../models';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  public suchEmailExists: boolean = false;
  public regCreated: boolean = false;
  public regInfo: AuthModels.User.IUser[] = [];

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

  ngOnInit() {
      this._registrationService.getReg()
        .subscribe(info => {
          this.regInfo = info;
        })
  }

  public submitRegistration() {
    let check = this.regInfo.find(email => email.email === this.form.get('email').value);
    if(!check) {
      this.suchEmailExists = false;
      this._registrationService.addRegistrator(this.form.value)
      this.form.reset();
      this.regCreated = true;
    } else {
      this.suchEmailExists = true;
    }
    
  }

}

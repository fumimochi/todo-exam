import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { UsersService } from "src/app/core/services/users.service";


@Component({
    selector: 'app-id-users',
    templateUrl: './id-users.component.html',
    styles: [`
        label {
            font-size: 24px;
        };
        .form-check {
            margin-top: 10px;
        }
    `]
})
export class IdUsersComponent implements OnInit{
    public isChanged: boolean;
    public currentUser: any;
    public userId: string;
    public role = new FormControl('', [Validators.required]);

    constructor(
        private readonly _activateRoute: ActivatedRoute,
        private readonly _userService: UsersService
    ) { };

    ngOnInit() {
        this.userId = this._activateRoute.snapshot.paramMap.get('id');
        this._userService.getUserById(+this.userId)
            .subscribe(user => {
                this.currentUser = user;
            })
    }

    public changeRole() {
        this.currentUser['role'] = this.role.value;
        this._userService.putUser(+this.userId, this.currentUser).subscribe();
        this.isChanged = true;
    }
}
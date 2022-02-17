import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { UsersService } from "src/app/core/services/users.service";


@Component({
    selector: 'app-id-users',
    templateUrl: './users-details-page.component.html',
    styleUrls: ['./users-details-page.component.scss']
})
export class UsersDetailsComponent implements OnInit{
    public isChanged: boolean;
    public currentUser: any;
    public userId: string;
    public role = new FormControl('', [Validators.required]);
    public todos = [];

    constructor(
        private readonly _activateRoute: ActivatedRoute,
        private readonly _userService: UsersService
    ) { };

    ngOnInit() {
        this.userId = this._activateRoute.snapshot.paramMap.get('id');
        this.returnTodos();
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

    public returnTodos() {
        this._userService.getUserById(+this.userId)
            .subscribe(user => {
                this.todos = user['todos'];
            })
    }
}
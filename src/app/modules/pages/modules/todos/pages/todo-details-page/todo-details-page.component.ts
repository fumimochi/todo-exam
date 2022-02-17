import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthModels } from 'src/app/modules/auth/models';
import { PagesModels } from 'src/app/modules/pages/models';
import { ProfileService } from '../../../profile/profile.service';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-change-todo',
  templateUrl: './todo-details-page.component.html',
})
export class TodoDetailsComponent implements OnInit {
  public caregories: PagesModels.Category.ICategories[] = [];
  public categoriesNames: Array<string> = [];
  public isChanged: boolean = false;
  public todo: PagesModels.Todo.ITodo;
  public currentUser: AuthModels.User.IUser;
  public userId: string;
  public todoId: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly _profileService: ProfileService,
    private readonly _todosService: TodosService
  ) {}

  public readonly form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl('', Validators.required),
    done: new FormControl(),
  });

  ngOnInit() {
    this.onRefresh();
  }

  public getAllCategories() {
    this._todosService.getCategories().subscribe((category) => {
      this.caregories = category.sort((cur, next) =>
        cur.id > next.id ? 1 : -1
      );
      this.caregories.forEach((cat) => {
        this.categoriesNames.push(cat.title);
      });
    });
  }

  public onRefresh() {
    this.getAllCategories();
    this.todoId = this.activateRoute.snapshot.paramMap.get('id');
    this.userId = this._profileService.get()['id'];
    this._todosService.getUserById(+this.userId).subscribe((user) => {
      this.currentUser = user;
      this.todo = user.todos.filter((todo) => todo.id === +this.todoId)[0];
    });
  }

  public saveChanges() {
    this.currentUser.todos[+this.todoId - 1] = this.form.value;
    this.currentUser.todos[+this.todoId - 1].id = +this.todoId;
    this._todosService
      .putUserWithTodo(this.currentUser, +this.userId)
      .subscribe();
    this.isChanged = true;
  }
}

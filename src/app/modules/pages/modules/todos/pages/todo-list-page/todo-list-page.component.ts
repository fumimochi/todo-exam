import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModels } from 'src/app/modules/auth/models';
import { PagesModels } from 'src/app/modules/pages/models';
import { ProfileService } from '../../../profile/profile.service';
import { TodosService } from '../../todos.service';

@Component({
  selector: 'app-display-todo',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss'],
})
export class TodoListComponent implements OnInit {
  public neededCategory: string;
  public caregories: PagesModels.Category.ICategories[] = [];
  public currentUser: AuthModels.User.IUser;
  public categoriesNames: Array<string> = [];
  public todos = [];
  public refreshedTodos: PagesModels.Todo.ITodo[] = [];
  public items$: PagesModels.Todo.ITodo[]; 
  public userId: number;

  constructor(
    private readonly _todosService: TodosService,
    private readonly _profileService: ProfileService
  ) {}

  public readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    done: new FormControl(),
    category: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getAllCategories();
    this.userId = this._profileService.get()['id'];
    this.returnTodos();
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

  public addTodo() {
    this.todos.push(this.form.value);
    this.currentUser.todos = this.todos;
    this.currentUser.todos[this.todos.length - 1].id = this.todos.length;
    this._todosService
      .putUserWithTodo(this.currentUser, this.userId)
      .subscribe((user) => {
        this.returnTodos();
        this.refreshedTodos = [...this.todos];
      });
    this.form.reset();
  }

  public returnTodos() {
    this._todosService.getUserById(this.userId).subscribe((user) => {
      this.currentUser = user;
      this.todos = user['todos'];
      this.refreshedTodos = this.todos;
      this.items$ = this.todos
    });
  }

  public deleteTodo(todo: PagesModels.Todo.ITodo) {
    this.todos = this.todos.filter((todoItem) => todoItem.id !== todo.id);
    this.currentUser.todos = this.todos;
    this._todosService
      .putUserWithTodo(this.currentUser, this.userId)
      .subscribe((data) => {
        this.returnTodos();
        this.refreshedTodos = [...this.todos];
      });
  }
}

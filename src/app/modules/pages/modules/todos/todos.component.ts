import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagesModels } from '../../models';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public answers = [{
    type: 'yes',
    text: 'done'
  }, {
    type: 'no',
    text: 'not done'
  }];
  public caregories: PagesModels.Category.ICategories[] = [];
  public categoriesNames: Array<string> = [];
  public todos: PagesModels.Todo.ITodo[] = [];
  public refreshedTodos: PagesModels.Todo.ITodo[] = [];

  constructor(private readonly _todosService: TodosService) { }

  public readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', ),
    done: new FormControl('no'),
    category: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getAllCategories();
    this.returnTodos();
  }

  public getAllCategories() {
    this._todosService.getCategories()
      .subscribe(category => {
        this.caregories = category.sort((cur, next) => cur.id > next.id ? 1 : -1);
        this.caregories.forEach(cat => {
          this.categoriesNames.push(cat.title)
        })
      })
  }

  public addTodo() {
    this._todosService.postTodo(this.form.value)
      .subscribe(tds => {
        this.returnTodos();
        this.refreshedTodos = [...this.todos];
        console.log(tds)
      });
      this.form.reset();
  } 

  public returnTodos() {
    this._todosService.getTodos()
      .subscribe(tds => {
        this.todos = tds;
        this.refreshedTodos = [...this.todos];
      })
  }

  public deleteTodo(todo: PagesModels.Todo.ITodo) {
    this._todosService.deleteTodo(todo)
      .subscribe(data => {
        this.todos = this.todos.filter(u => u.id !== todo.id);
        this.refreshedTodos = [...this.todos];
      })
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleService } from 'src/app/core/services/role.service';
import { PagesModels } from 'src/app/modules/pages/models';
import { ProfileService } from '../../../profile/profile.service';
import { TodosService } from '../../../todos/todos.service';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './categories-list-page.component.html',
  styleUrls: ['./categories-list-page.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  public userId: number;
  public isUser: boolean;
  public catExists: boolean = false;
  public todos: PagesModels.Todo.ITodo[];
  public currentCat: PagesModels.Category.ICategories;
  public allCategories: PagesModels.Category.ICategories[] = [];
  public refreshedCategories: PagesModels.Category.ICategories[] = [];


  constructor(
    private readonly _categoriesService: CategoriesService,
    private readonly _todosService: TodosService,
    private readonly _profileService: ProfileService,
    private readonly _roleService: RoleService
  ) {}

  public readonly form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.returnCategories();
    this.userId = this._profileService.get()['id'];
    this._roleService.getUserRole() === 'user'
      ? (this.isUser = true)
      : (this.isUser = false);
  }

  public returnCategories() {
    this._categoriesService.get().subscribe((ctgrs) => {
      this.allCategories = ctgrs;
      this.refreshedCategories = [...this.allCategories];
    });
  }

  public addCategory() {
    this._categoriesService.add(this.form.value).subscribe((data) => {
      this.returnCategories();
      this.refreshedCategories = [...this.allCategories];
    });
    this.form.reset();
  }

  public deleteCategory(cat: PagesModels.Category.ICategories) {
    this._todosService.getUserById(this.userId).subscribe((user) => {
      this.todos = user.todos.filter((todo) => +todo.category + 1 === cat.id);
      if (this.todos.length > 0) {
        this.catExists = true;
      } else {
        this.catExists = false;
        this.delete(cat);
      }
    });
  }

  public delete(cat) {
    this._categoriesService.delete(cat).subscribe((data) => {
      this.allCategories = this.allCategories.filter(
        (data) => data.id !== cat.id
      );
      this.refreshedCategories = [...this.allCategories];
    });
  }
}

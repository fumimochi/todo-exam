import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PagesModels } from '../../models';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public currentCat: PagesModels.Category.ICategories;
  public allCategories: PagesModels.Category.ICategories[] = [];
  public refreshedCategories: PagesModels.Category.ICategories[] = [];

  constructor(
    private readonly _categoriesService: CategoriesService,
    ) {  };  

  public readonly form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })
  
  ngOnInit() {
    this.returnCategories();
  }

  public returnCategories() {
    this._categoriesService.getCategories()
      .subscribe(ctgrs => {
        this.allCategories = ctgrs;
        this.refreshedCategories = [...this.allCategories];
      });
  }
  
  public addCategory() {
    this._categoriesService.addCategory(this.form.value)
    .subscribe(x => {
      this.returnCategories();
      this.refreshedCategories = [...this.allCategories];
    });
    this.form.reset();
  }

  public deleteCategory(cat: PagesModels.Category.ICategories) {
    this._categoriesService.deleteCategory(cat)
      .subscribe(data => {
        this.allCategories = this.allCategories.filter(u => u.id !== cat.id)
        this.refreshedCategories = [...this.allCategories]
      })
  }
}

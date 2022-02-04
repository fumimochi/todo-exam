import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PagesModels } from '../../../../models';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-id-category',
  templateUrl: './id-category.component.html',
})
export class IdCategoryComponent implements OnInit {
  public currentComp: PagesModels.Category.ICategories;
  public isChanged: boolean = false;
  public id: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly _categoriesService: CategoriesService
  ) { }

  public readonly form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this._categoriesService.getExectCategory(+this.id)
      .subscribe(details => {
        this.currentComp = details;
      })
    
  }

  public saveChanges() {
    this._categoriesService.changeCategory(this.form.value, +this.id)
      .subscribe(data => {
        console.log(data)
      })
      this.isChanged = true;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { RoleService } from 'src/app/core/services/role.service';
import { PagesModels } from '../../../../models';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-id-category',
  templateUrl: './change-category.component.html',
  styles: [`
      #user label {
        font-size: 36px;
        text-decoration: underline;
      };
      #user p {
        font-size: 24px;
      };
  `]
})
export class ChangeCategoryComponent implements OnInit {
  public currentComp: PagesModels.Category.ICategories;
  public isUser: boolean;
  public isChanged: boolean = false;
  public id: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly _categoriesService: CategoriesService
  ) { }

  public readonly form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.roleService.getUserRole() === 'user' ? this.isUser = true : this.isUser = false;
    this._categoriesService.getExectCategory(+this.id)
      .subscribe(details => {
        this.currentComp = details;
      })
    
  }

  public saveChanges() {
    this._categoriesService.change(this.form.value, +this.id)
      .subscribe()
    this.isChanged = true;
  }
}

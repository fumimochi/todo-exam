import { Component, Input, TemplateRef } from '@angular/core';

import { AuthModels } from 'src/app/modules/auth/models';
import { PagesModels } from '../../../models';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {
  public showingCard: boolean = false;
  public itemInfo: Array<any>;

  @Input() items$: Array<PagesModels.Todo.ITodo 
  | PagesModels.Category.ICategories
  | AuthModels.User.IUser
  >;
  @Input() cardRef: TemplateRef<any>;

}

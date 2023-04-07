import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: 'view_user',
    component: ViewUserComponent
  },
  {
    path: 'add_user',
    component: AddUserComponent
  },
  {
    path: 'update_user',
    component: UpdateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

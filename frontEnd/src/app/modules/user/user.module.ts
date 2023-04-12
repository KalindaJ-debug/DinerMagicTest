import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdateUserComponent } from './update-user/update-user.component';
import { TableFilterPipe } from 'src/app/shared/pipes/table_filter/table-filter.pipe';


@NgModule({
  declarations: [
    ViewUserComponent,
    AddUserComponent,
    UpdateUserComponent,
    TableFilterPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})
export class UserModule { }

import { Pipe, PipeTransform } from '@angular/core';
import { IUserModel } from '../../interfaces/user/user-model';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(value: Array<IUserModel>, searchText: string, selection: string) {
    if (!value) {
      return [];
    }
    if (!searchText) {
      return value;
    }

    if (selection == "email")
    {
      return value.filter(user => {
        return user.email.toLowerCase().includes(searchText.toLowerCase())
      });
    }
    else
    {
      return value.filter(user => {
        return user.name.toLowerCase().includes(searchText.toLowerCase())
      });
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { INewTaskData } from 'src/app/core/models/request.model';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: INewTaskData[], options: string = '', search: string = ''): INewTaskData[] {
    if (!search.trim()) {
      return tasks;
    }
    switch (options) {
      case 'number':
        return tasks.filter((task) => {
          return task.order.toString().includes(search);
        });

      case 'title':
        return tasks.filter((task) => {
          return task.title.toLowerCase().includes(search.toLowerCase());
        });

      case 'user':
        return tasks.filter((task) => {
          return task.userId.toLowerCase().includes(search.toLowerCase());
        });
      case 'discription':
        return tasks.filter((task) => {
          return task.description.toLowerCase().includes(search.toLowerCase());
        });

      default:
        return tasks;
    }
  }

}

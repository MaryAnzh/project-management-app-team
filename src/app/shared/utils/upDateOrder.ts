import { IColumnsData } from '../../core/models/request.model'


export function upDateOrder(array: IColumnsData[]): void {
  for (let i = 1; i <= array.length; i += 1) {
    array[i].order = i;
  }
}

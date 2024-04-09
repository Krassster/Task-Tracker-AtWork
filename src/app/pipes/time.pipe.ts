import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class TimePipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('ru', { month: 'short' });
    const day = date.getDate();
    return `${day} ${month}`;
  }
}

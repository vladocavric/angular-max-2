import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString, status) {
    if (value.length === 0 || filteredString === '') {
      return value;
    }
    const filteredArr = [];
    for (const elemet of value) {
      if (elemet.status.toLowerCase().includes(filteredString.toLowerCase())) {
        filteredArr.push(elemet);
      }
    }
    return filteredArr;
  }
}

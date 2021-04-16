import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  // transform(value: any, filteredString: string, propName: string): unknown {
  //   if (value.length === 0 || filteredString === '') {
  //     return value;
  //   }
  //   let resultArr = [];
  //   for (let item of value) {
  //     if (item[propName] === filteredString) {
  //       resultArr.push(item);
  //     }
  //   }
  //   return resultArr;
  // }
  transform(value: any, filteredString: string): unknown {
    if (value.length === 0 || filteredString === '') {
      return value;
    }
    let resultArr = [];
    for (let item of value) {
      if (item['status'].toLowerCase().includes(filteredString.toLowerCase()) ||
        item['instanceType'].toLowerCase().includes(filteredString.toLowerCase()) ||
        item['name'].toLowerCase().includes(filteredString.toLowerCase())) {
        resultArr.push(item);
      }
    }
    return resultArr;
  }
}

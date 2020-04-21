import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: number) : string {
    let result = value.toString()
    let index = result.indexOf('.')
    if(index > 0)
      {
        result = result.substring(0,result.indexOf('.')+3)
      }   

    return result
  }
}
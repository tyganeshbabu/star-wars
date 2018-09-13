import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberspecific'
})
export class NumberSpecificPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    let exp, rounded,
      suffixes = ['Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input === 'unknown') {
        return 'UNKNOWN';
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + ' ' + suffixes[exp - 1];


  }

}
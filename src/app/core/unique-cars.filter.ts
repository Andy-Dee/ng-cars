import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterUniqueCar',
    pure: false
})

export class FilterUniqueCarsPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let uniqueArray = [];
        value.forEach((element: { brand: any; }) => {
            if(!uniqueArray.find(param => element.brand == param.brand)) {
                uniqueArray.push(element);
            }
        });
        return uniqueArray;
    }
}
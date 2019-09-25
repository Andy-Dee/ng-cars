import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterUniqueModification',
    pure: false
})

export class FilterUniqueModificationsPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let uniqueArray = [];
        value.forEach((element: { modification: any; }) => {
            if(!uniqueArray.find(param => element.modification == param.modification)) {
                uniqueArray.push(element);
            }
        });
        return uniqueArray;
    }
}
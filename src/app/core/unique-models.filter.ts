import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterUniqueModel',
    pure: false
})

export class FilterUniqueModelsPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let uniqueArray = [];
        value.forEach((element: { model: any; }) => {
            if(!uniqueArray.find(param => element.model == param.model)) {
                uniqueArray.push(element);
            }
        });
        return uniqueArray;
    }
}
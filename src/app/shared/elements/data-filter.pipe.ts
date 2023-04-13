import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            let key:any=  Object.keys(array[0]);
            for(let k of key){
            let row_seleted= _.filter(array, row=>{
                if((row[k].toString().toUpperCase()).indexOf(query.toUpperCase()) > -1){
                    return row;
                }
            }
            );           
            if(row_seleted.length>0)
            return row_seleted;        
        }
        }
        return array;
    }
}
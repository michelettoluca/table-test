import { Pipe, PipeTransform } from "@angular/core";
import { TableData, TableFilter } from "../table/table.types";

@Pipe({ name: "tFilter" })
export class TFilter implements PipeTransform {
   transform(data: TableData[], filters: TableFilter[]): TableData[] {
      return data.filter((row) => {
         if (filters.length === 0) return true;

         let includeRow = false;

         for (const filter of filters) {
            if (row[filter.column]) {
               const rowValue = row[filter.column].toLowerCase();
               const filterValue = filter.value.toLowerCase();

               includeRow = includeRow || rowValue.includes(filterValue);
            }
         }

         return includeRow;
      })
   }
}

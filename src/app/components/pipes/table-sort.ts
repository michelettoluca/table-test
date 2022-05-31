import { Pipe, PipeTransform } from "@angular/core";
import { OrderType, TableData, TableFilter } from "../table/table.types";

@Pipe({ name: "tSort" })
export class TSort implements PipeTransform {
   transform(data: TableData[], column: string, orderType: OrderType): TableData[] {
      if (orderType !== OrderType.none) {
         return [...data].sort((a, b) =>
            a[column].toLowerCase() >= b[column].toLowerCase()
               ? -1 * orderType
               : 1 * orderType
         );
      }

      return data;
   }
}

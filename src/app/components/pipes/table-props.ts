import { Pipe, PipeTransform } from "@angular/core";
import { TableData } from "../table/table.types";
import { TableProps } from "../table/table.component";

@Pipe({ name: "tProps" })
export class TProps implements PipeTransform {
   transform(data: TableData[], tableProps: TableProps): TableData[] {
      setTimeout(() => {
         tableProps.length = data.length;
      }, 0);
      console.log(data)

      return data;
   }
}

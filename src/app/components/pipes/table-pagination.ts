import { Pipe, PipeTransform } from "@angular/core";
import { TableData } from "../table/table.types";

@Pipe({ name: "tPagination" })
export class TPagination implements PipeTransform {
   transform(data: TableData[], itemsPerPage: number, currentPage: number
   ): TableData[] {
      return data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
   }
}
